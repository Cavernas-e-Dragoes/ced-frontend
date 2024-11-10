import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magic } from '../models/magic';
import { MagicDetail } from '../models/magic-detail';

@Injectable({
  providedIn: 'root'
})
export class MagicService {
  private apiUrl = 'https://ced.discloud.app/api/magias/';

  constructor(private http: HttpClient) { }

  getMagics(): Observable<{ count: number, results: Magic[] }> {
    return this.http.get<{ count: number, results: Magic[] }>(this.apiUrl);
  }

  getMagicDetail(index: string): Observable<MagicDetail> {
    return this.http.get<MagicDetail>(`${this.apiUrl}${index}`);
  }

  getFilteredMagics(level?: number, school?: string, className?: string): Observable<{ count: number, results: Magic[] }> {
    let params: any = {};

    if (level) params.level = level;
    if (school) params.schoolName = school;
    if (className) params.className = className;

     // Se os parâmetros estiverem vazios, faz a requisição sem filtros para retornar todas as magias
    if (Object.keys(params).length === 0) {
        return this.http.get<{ count: number, results: Magic[] }>(`${this.apiUrl}`);
    }

    // Se houver parâmetros, faz a requisição com filtros
    return this.http.get<{ count: number, results: Magic[] }>(`${this.apiUrl}search`, { params });
}



}
