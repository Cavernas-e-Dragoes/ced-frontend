import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  private apiUrl = 'https://characters.discloud.app/v1/api/user/create';
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
    return this.http.post(this.loginUrl, userData, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          this.saveAuthData(response.token, response.user.name);
        }
      })
    );
  }

  // ✅ Salvar token e nome do usuário no localStorage
  private saveAuthData(token: string, userName: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, userName);
  }

  // ✅ Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // ✅ Retorna o nome do usuário logado
  getUserName(): string {
    return localStorage.getItem(this.userKey) || 'Aventureiro';
  }

  // ✅ Logout (remove os dados do localStorage)
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
