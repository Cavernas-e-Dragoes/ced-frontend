import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmailVerificationService } from 'src/app/services/email-verification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EmailVerificationStatus } from 'src/app/interfaces/email-verification.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  userName: string = '';
  userEmail: string = '';
  emailVerified: boolean = false;
  verificationMessage: string = '';
  redirectedFromGuard: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private emailVerificationService: EmailVerificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeUserData();
    this.checkEmailVerification();
    this.checkQueryParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['emailVerification'] === 'required') {
          this.redirectedFromGuard = true;
          this.verificationMessage = 'Você precisa verificar seu e-mail antes de acessar esta área. Por favor, verifique sua caixa de entrada ou solicite um novo e-mail de verificação.';
        }
      });
  }

  private initializeUserData(): void {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
    console.log('Inicializando componente de perfil');
  }

  private checkEmailVerification(): void {
    this.emailVerificationService.getUserVerificationStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: EmailVerificationStatus) => {
          console.log('Resposta da verificação:', response);
          this.updateVerificationStatus(response);
        },
        error: (error: Error) => {
          console.error('Erro ao buscar status de verificação:', error);
          this.handleVerificationError();
        }
      });
  }

  private updateVerificationStatus(response: EmailVerificationStatus): void {
    if (response) {
      this.emailVerified = response.emailVerified;
      
      // Não sobrescrever a mensagem se veio do guard
      if (!this.redirectedFromGuard) {
        this.verificationMessage = response.verificationMessage || 
          'Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada ou solicite um novo e-mail de verificação.';
      }
      
      console.log('Status do email:', this.emailVerified);
      console.log('Mensagem de verificação:', this.verificationMessage);
    }
  }

  private handleVerificationError(): void {
    this.emailVerified = false;
    this.verificationMessage = 'Não foi possível verificar o status do seu email. Por favor, tente novamente mais tarde.';
  }

  reenviarEmailVerificacao(): void {
    if (!this.validateUserEmail()) return;

    this.verificationMessage = 'Enviando solicitação de verificação...';
    console.log('Chamando serviço de reenvio para o email:', this.userEmail);

    this.emailVerificationService.resendVerificationEmail()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => this.handleResendSuccess(response),
        error: (error: HttpErrorResponse) => this.handleResendError(error)
      });
  }

  private validateUserEmail(): boolean {
    if (!this.userEmail || this.userEmail === 'Email não encontrado') {
      console.error('Email do usuário não disponível');
      this.verificationMessage = 'Não foi possível reenviar o email. Email do usuário não encontrado.';
      return false;
    }
    return true;
  }

  private handleResendSuccess(response: any): void {
    console.log('Resposta de sucesso:', response);
    this.verificationMessage = 'Email de verificação reenviado com sucesso! Verifique sua caixa de entrada.';
    
    // Atualizar o status após um breve delay
    setTimeout(() => {
      this.checkEmailVerification();
    }, 1000);
  }

  private handleResendError(error: HttpErrorResponse): void {
    console.error('Erro completo ao reenviar e-mail:', error);
    
    switch (error.status) {
      case 500:
        this.handle500Error(error);
        break;
      case 404:
        this.verificationMessage = 'Endereço de email não encontrado. Verifique se você está usando o email correto.';
        break;
      case 401:
        this.handle401Error();
        break;
      default:
        this.verificationMessage = `Não foi possível reenviar o email de verificação. ${error.error?.message || 'Por favor, tente novamente mais tarde.'}`;
    }
  }

  private handle500Error(error: HttpErrorResponse): void {
    if (error.error?.message?.includes('already verified')) {
      this.verificationMessage = 'Este email já foi verificado anteriormente.';
    } else {
      this.verificationMessage = 'Email de verificação enviado! Por favor, verifique sua caixa de entrada. Se não receber em alguns minutos, tente novamente.';
    }
  }

  private handle401Error(): void {
    this.verificationMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
