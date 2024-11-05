import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../models/class'; // Importando o modelo
import { ClassDetail } from '../models/class-detail'; // Nova interface


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'https://ced.discloud.app/api/classes';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<{ count: number, results: Class[] }> {
    return this.http.get<{ count: number, results: Class[] }>(this.apiUrl);
  }

  getClassDetail(index: string): Observable<ClassDetail> {
    return this.http.get<ClassDetail>(`${this.apiUrl}/${index}`);
  }
}
