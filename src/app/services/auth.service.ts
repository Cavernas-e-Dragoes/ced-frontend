import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

const baseUrl = 'https://ced-user-management-production.up.railway.app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: User): Observable<User> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = 'https://ced-user-management-production.up.railway.app/v1/api/user/create';
    return this.http.post<User>(url, user, { headers: reqHeader });
  }

  create(user: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${baseUrl}/v1/api/user/create`, user, { headers: reqHeader });
  }

  login(credentials: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${baseUrl}/login`, credentials, { headers: reqHeader }).pipe(
      tap(() => {
        this.isAuthenticated = true;
      })
    );
  }

  logOut() {
    sessionStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
