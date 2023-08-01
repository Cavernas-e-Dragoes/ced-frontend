import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { characterCard} from '../models/characterCard'
import { Character } from '../models/character';


const baseUrl = 'https://characters-management-production.up.railway.app';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {

  constructor(private http: HttpClient) { }

  list(token:string): Observable<any> {
    
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
   });
    return this.http.get<characterCard>
    (`${baseUrl}/v1/api/characters/list`, {headers : reqHeader});
  }

  getCharacter(id:string): Observable<Character> {
    return this.http.get<Character>(`${baseUrl}/v1/api/characters/` + id);
  }
}
