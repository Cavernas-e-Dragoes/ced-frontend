import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://characters.discloud.app/v1/api/user/create';
  private loginUrl = 'https://characters.discloud.app/login';

  constructor(private http: HttpClient) {}

  registerUser(userData: RegisterUser): Observable<any> {
    return this.http.post(this.apiUrl, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  loginUser(userData: LoginUser): Observable<any> {
    return this.http.post(this.loginUrl, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
}
