import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
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
    const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);
    
    // Se já temos os dados salvos do login, usamos eles
    if (verificationMessage) {
      return of({
        emailVerified,
        verificationMessage
      });
    }
    
    // Caso contrário, tentamos buscar do servidor
    if (!token) {
      return throwError(() => new Error('Token não encontrado'));
    }
    
    return this.http.get<EmailVerificationStatus>(`${this.apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao verificar status do email:', error);
        return of({
          emailVerified: false,
          verificationMessage: 'Não foi possível verificar o status do seu email. Por favor, tente novamente mais tarde.'
        });
      })
    );
  }

  resendVerificationEmail(): Observable<EmailVerificationResponse> {
    const userEmail = localStorage.getItem(StorageKeys.USER_EMAIL);
    const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);
    
    if (!userEmail) {
      return throwError(() => new Error('Email do usuário não encontrado no armazenamento local'));
    }

    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado'));
    }
    
    console.log('Enviando solicitação para reenviar email para:', userEmail);
    
    return this.http.post<EmailVerificationResponse>(`${this.apiUrl}/resend-verification`, 
      { email: userEmail },
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro detalhado:', error);
        throw error;
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