import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError, map } from 'rxjs';
import { EmailVerificationStatus, EmailVerificationResponse } from '../interfaces/email-verification.interface';
import { StorageKeys } from '../constants/storage-keys.constant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserVerificationStatus(): Observable<EmailVerificationStatus> {
    const emailVerified = localStorage.getItem(StorageKeys.EMAIL_VERIFIED) === 'true';
    const verificationMessage = localStorage.getItem(StorageKeys.VERIFICATION_MESSAGE);
    
    // Por enquanto, retornamos o status do localStorage
    return of({
      emailVerified,
      verificationMessage: verificationMessage || 'Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada ou solicite um novo e-mail de verificação.'
    });
  }

  resendVerificationEmail(): Observable<EmailVerificationResponse> {
    const userEmail = localStorage.getItem(StorageKeys.USER_EMAIL);
    
    if (!userEmail) {
      return throwError(() => new Error('Email do usuário não encontrado no armazenamento local'));
    }
    
    const url = `${this.apiUrl}/resend-verification?email=${encodeURIComponent(userEmail)}`;
    console.log('URL da requisição:', url);
    
    return this.http.post<EmailVerificationResponse>(
      url,
      {},
      {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).pipe(
      tap(response => {
        console.log('Resposta do servidor:', response);
        // Se a resposta for bem sucedida, atualizamos o status no localStorage
        if (response.success) {
          localStorage.setItem(StorageKeys.VERIFICATION_MESSAGE, response.message);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro completo:', error);
        console.error('Status do erro:', error.status);
        console.error('Mensagem do erro:', error.error);
        
        let errorMessage = 'Não foi possível reenviar o email de verificação.';
        
        if (error.error && typeof error.error === 'object' && 'message' in error.error) {
          errorMessage = error.error.message;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = error.error.message;
    } else {
      // Erro do lado do servidor
      errorMessage = error.error?.message || error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
} 