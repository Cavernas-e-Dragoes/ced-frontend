import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magic } from '../models/magic';
import { MagicDetail } from '../models/magic-detail';

@Injectable({
  providedIn: 'root'
})
export class MagicService {
  private apiUrl = 'https://ced.discloud.app/api/magias';

  constructor(private http: HttpClient) { }

  getMagics(): Observable<{ count: number, results: Magic[] }> {
    return this.http.get<{ count: number, results: Magic[] }>(this.apiUrl);
  }

  getMagicDetail(index: string): Observable<MagicDetail> {
    return this.http.get<MagicDetail>(`${this.apiUrl}/${index}`);
  }

}
