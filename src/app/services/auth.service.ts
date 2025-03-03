import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';


interface RegisterUser {
  name: string;
  email: string;
  login: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user_name';
  private userIdKey = 'user_id';

  private apiUrl = 'https://characters.discloud.app/api/user';
  private loginUrl = 'https://characters.discloud.app/login'; // Confirma se esse é o endpoint correto

  constructor(private http: HttpClient) {}

  // ✅ Registrar um novo usuário
  registerUser(userData: RegisterUser): Observable<any> {
    return this.http.post(this.apiUrl, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ✅ Login do usuário
  loginUser(userData: LoginUser): Observable<any> {
    return this.http.post<any>(this.loginUrl, userData).pipe(
      tap((response) => {
        console.log('Resposta completa do login:', response);
        
        if (response && response.token) {
          // Para depuração, vamos ver a estrutura completa da resposta
          console.log('Propriedades da resposta:', Object.keys(response));
          
          // Tenta obter o nome de usuário da estrutura da resposta
          let userName = 'Aventureiro';
          let userId = '';
          
          if (response.name) {
            userName = response.name;
          } else if (response.user && response.user.name) {
            userName = response.user.name;
          } else if (response.userData && response.userData.name) {
            userName = response.userData.name;
          }
          
          if (response.id) {
            userId = response.id;
          } else if (response.user && response.user.id) {
            userId = response.user.id;
          }
          
          this.saveAuthData(response.token, userName, userId);
        }
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        return of(null);
      })
    );
  }

  // ✅ Salvar token e nome do usuário no localStorage
  private saveAuthData(token: string, userName: string, userId: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, userName);
    localStorage.setItem(this.userIdKey, userId);
  }

  // ✅ Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // ✅ Retorna o nome do usuário logado
  getUserName(): string {
    return localStorage.getItem(this.userKey) || 'Aventureiro';
  }

  getUserEmail(): string {
    return localStorage.getItem('user_email') || 'Email não encontrado';
  }
  
  getUserId(): string {
    return localStorage.getItem(this.userIdKey) || '';
  }

  // ✅ Logout (remove os dados do localStorage)
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem('user_email');
    localStorage.removeItem('email_verified');
    localStorage.removeItem('verification_message');
  }
}
