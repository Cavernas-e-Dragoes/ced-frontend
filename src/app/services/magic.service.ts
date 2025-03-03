import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magic } from '../models/magic';
import { MagicDetail } from '../models/magic-detail';

@Injectable({
  providedIn: 'root'
})
export class MagicService {
  private apiUrl = 'https://drs.discloud.app/api/magias';

  constructor(private http: HttpClient) { }

  getMagics(): Observable<{ count: number, results: Magic[] }> {
    return this.http.get<{ count: number, results: Magic[] }>(this.apiUrl);
  }

  getMagicDetail(index: string): Observable<MagicDetail> {
    return this.http.get<MagicDetail>(`${this.apiUrl}/${index}`);
  }

  getFilteredMagics(levels?: number[], school?: string, className?: string, page: number = 0, size: number = 10): Observable<{ count: number, results: Magic[] }> {
    let params = new HttpParams();
  
    // Adiciona múltiplos valores para 'level'
    if (levels && levels.length > 0) {
      levels.forEach(level => {
        params = params.append('level', level.toString());
      });
    }
  
    // Adiciona escola, classe, página e tamanho
    if (school) params = params.set('schoolName', school);
    if (className) params = params.set('className', className);
    params = params.set('page', page.toString()).set('size', size.toString());
  
    return this.http.get<{ count: number, results: Magic[] }>(`${this.apiUrl}/search`, { params });
  }


}
