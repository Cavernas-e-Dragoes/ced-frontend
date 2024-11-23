import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipCategoriaResposta } from '../models/equip-categoria-resposta'; 
import { Equip } from '../models/equip';


@Injectable({
  providedIn: 'root'
})
export class EquipsService {
  // Base URL da API
  private baseUrl = 'https://ced.discloud.app/api';

  constructor(private http: HttpClient) { }

  // Método para obter equipamentos por subcategoria
  getEquipamentosPorSubcategoria(subcategoria: string): Observable<EquipCategoriaResposta> {
    // Aqui, removemos o "/api" da subcategoria, assumindo que já está sendo gerido pela baseUrl.
    const url = `${this.baseUrl}/categorias-de-equipamento/${subcategoria}`;
    
    return this.http.get<EquipCategoriaResposta>(url);
  }

  // Método para obter detalhes do equipamento
  getEquipamentoDetalhes(index: string): Observable<Equip> {
    // Construção correta da URL: sem duplicação de "/api"
    const url = `${this.baseUrl}/equipamentos/${index}`; 
    return this.http.get<Equip>(url);
  }
}
