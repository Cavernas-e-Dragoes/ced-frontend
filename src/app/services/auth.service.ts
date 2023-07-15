import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';

const baseUrl = 'https://ced-user-management-production.up.railway.app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: User): Observable<User> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
   });
    const url = 'https://ced-user-management-production.up.railway.app/v1/api/user/create';
    return this.http.post<User>(url, user, {headers : reqHeader});
  }
  
  create(user:any): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
   });

    return this.http.post(`${baseUrl}/v1/api/user/create`, user, {headers : reqHeader});

  }
  
  login(credentials:any): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json'
   });
    return this.http.post(`${baseUrl}/login`, credentials,  {headers : reqHeader});
  }

  logOut() {
    sessionStorage.clear()
    this.router.navigate(['login'])
  }
}