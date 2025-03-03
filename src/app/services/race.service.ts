import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../models/race';
import { RaceDetail } from '../models/race-detail';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private apiUrl = 'https://drs.discloud.app/api/racas';

  constructor(private http: HttpClient) { }

  getRaces(): Observable<{ count: number, results: Race[] }> {
    return this.http.get<{ count: number, results: Race[] }>(this.apiUrl);
  }

  getRaceDetail(index: string): Observable<RaceDetail> {
    return this.http.get<RaceDetail>(`${this.apiUrl}/${index}`);
  }
}