import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character, CharacterListItem } from '../models/character';
import { Observable, catchError, tap, throwError, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'https://characters.discloud.app/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Método privado para obter os headers de autorização
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Cria um novo personagem
  createCharacter(character: Character): Observable<any> {
    // Cria um objeto literal com os valores do personagem e do Bruno
    const apiCharacter = {
      name: character.name || "Personagem",
      race: "ELFO", 
      subRace: "ELFO_ALTO", 
      charClass: "MAGO",  
      inspiration: 0,
      attributes: {
        strength: 10,
        dexterity: 14,
        constitution: 12,
        intelligence: 18,
        wisdom: 13,
        charisma: 11
      },
      skills: {
        stStrength: false,
        stDexterity: true,
        stConstitution: false,
        stIntelligence: true,
        stWisdom: true,
        stCharisma: false,
        acrobatics: true,
        animalHandling: false,
        arcana: true,
        athletics: false,
        deception: false,
        history: true,
        insight: true,
        intimidation: false,
        investigation: true,
        medicine: false,
        nature: true,
        perception: true,
        performance: false,
        persuasion: false,
        religion: true,
        sleightOfHand: false,
        stealth: true,
        survival: false
      },
      progression: {
        alignment: "Leal e Bom"
      }
    };
    
    // Substitui pelos valores reais dos atributos, se disponíveis
    if (character.attributes) {
      apiCharacter.attributes.strength = Number(character.attributes.strength) || 10;
      apiCharacter.attributes.dexterity = Number(character.attributes.dexterity) || 14;
      apiCharacter.attributes.constitution = Number(character.attributes.constitution) || 12;
      apiCharacter.attributes.intelligence = Number(character.attributes.intelligence) || 18;
      apiCharacter.attributes.wisdom = Number(character.attributes.wisdom) || 13;
      apiCharacter.attributes.charisma = Number(character.attributes.charisma) || 11;
    }
    
    // Log para depuração
    console.log('Enviando personagem para API:', JSON.stringify(apiCharacter));
    
    return this.http.post(`${this.baseUrl}/personagens`, apiCharacter, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => console.log('Resposta da API:', response)),
      catchError(error => {
        console.log('Erro detalhado da API:', error);
        if (error.error && error.error.message) {
          console.log('Mensagem de erro do servidor:', error.error.message);
        }
        return throwError(() => error);
      })
    );
  }

  // Lista todos os personagens do usuário logado
  listCharacters(): Observable<CharacterListItem[]> {
    const userId = this.authService.getUserId();
    return this.http.get<any[]>(`${this.baseUrl}/personagens?userId=${userId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => console.log('Personagens recebidos da API:', response)),
      map(characters => {
        return characters.map(apiChar => {
          // Processamento simplificado e direto
          let raceName = 'Desconhecida';
          let className = 'Desconhecida';
          
          // Obter nome da raça
          if (apiChar.race) {
            if (typeof apiChar.race === 'string') {
              raceName = this.formatEnumValue(apiChar.race);
            } else if (typeof apiChar.race === 'object') {
              raceName = apiChar.race.name || (apiChar.race.index ? this.formatEnumValue(apiChar.race.index) : 'Desconhecida');
            }
          }
          
          // Obter nome da classe
          if (apiChar.charClass) {
            if (typeof apiChar.charClass === 'string') {
              className = this.formatEnumValue(apiChar.charClass);
            } else if (typeof apiChar.charClass === 'object') {
              className = apiChar.charClass.name || (apiChar.charClass.index ? this.formatEnumValue(apiChar.charClass.index) : 'Desconhecida');
            }
          }
          
          return {
            id: apiChar.id,
            name: apiChar.name || 'Sem nome',
            race: raceName,
            class: className,
            level: apiChar.level || 1
          };
        });
      }),
      catchError(error => {
        console.error('Erro ao obter personagens:', error);
        return throwError(() => error);
      })
    );
  }

  // Obtém um personagem específico
  getCharacter(id: string): Observable<Character> {
    return this.http.get<any>(`${this.baseUrl}/personagens/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(apiChar => console.log('Personagem recebido da API:', apiChar)),
      map(apiChar => {
        const character: Character = {
          id: apiChar.id,
          userId: apiChar.userId || this.authService.getUserId(),
          name: apiChar.name || 'Personagem sem nome',
          level: apiChar['level'] || 1,
          experience: apiChar['experience'] || 0,
          
          race: {
            index: apiChar['race'] || 'HUMANO',
            name: this.formatEnumValue(apiChar['race']) || 'Humano',
            url: ''
          },
          class: {
            index: apiChar['charClass'] || 'GUERREIRO',
            name: this.formatEnumValue(apiChar['charClass']) || 'Guerreiro',
            url: ''
          },
          
          attributes: {
            strength: apiChar.attributes?.strength || 10,
            dexterity: apiChar.attributes?.dexterity || 10,
            constitution: apiChar.attributes?.constitution || 10,
            intelligence: apiChar.attributes?.intelligence || 10,
            wisdom: apiChar.attributes?.wisdom || 10,
            charisma: apiChar.attributes?.charisma || 10
          },
          
          background: apiChar['background'] || '',
          alignment: apiChar['progression']?.alignment || '',
          
          hitPoints: {
            maximum: apiChar['hitPoints']?.maximum || 10,
            current: apiChar['hitPoints']?.current || 10,
            temporary: apiChar['hitPoints']?.temporary || 0
          },
          
          armorClass: apiChar['armorClass'] || 10,
          initiative: this.calculateAttributeModifier(apiChar.attributes?.dexterity || 10),
          speed: apiChar['speed'] || 30,
          
          proficiencies: this.extractProficiencies(apiChar),
          equipment: this.extractEquipment(apiChar),
          features: this.extractFeatures(apiChar),
          
          createdAt: apiChar.createdAt ? new Date(apiChar.createdAt) : new Date(),
          updatedAt: apiChar.updatedAt ? new Date(apiChar.updatedAt) : new Date()
        };
        
        // Se tiver spells, processar
        if (apiChar['spells']) {
          character.spells = this.extractSpells(apiChar);
        }
        
        return character;
      }),
      catchError(error => {
        console.error('Erro ao obter detalhes do personagem:', error);
        return throwError(() => error);
      })
    );
  }
  
  // Método auxiliar para formatar valores de enumeração
  private formatEnumValue(value: string): string {
    if (!value) return '';
    
    // Substitui underscore por espaço e capitaliza cada palavra
    return value
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Extrai proficiências da resposta da API
  private extractProficiencies(apiChar: any): any {
    const proficiencies = {
      savingThrows: [] as string[],
      skills: [] as string[],
      languages: [] as string[],
      tools: [] as string[],
      weapons: [] as string[],
      armors: [] as string[]
    };
    
    // Processa saving throws
    if (apiChar.skills) {
      if (apiChar.skills['stStrength']) proficiencies.savingThrows.push('strength');
      if (apiChar.skills['stDexterity']) proficiencies.savingThrows.push('dexterity');
      if (apiChar.skills['stConstitution']) proficiencies.savingThrows.push('constitution');
      if (apiChar.skills['stIntelligence']) proficiencies.savingThrows.push('intelligence');
      if (apiChar.skills['stWisdom']) proficiencies.savingThrows.push('wisdom');
      if (apiChar.skills['stCharisma']) proficiencies.savingThrows.push('charisma');
      
      // Processa perícias
      if (apiChar.skills['acrobatics']) proficiencies.skills.push('acrobatics');
      if (apiChar.skills['animalHandling']) proficiencies.skills.push('animal handling');
      if (apiChar.skills['arcana']) proficiencies.skills.push('arcana');
      if (apiChar.skills['athletics']) proficiencies.skills.push('athletics');
      if (apiChar.skills['deception']) proficiencies.skills.push('deception');
      if (apiChar.skills['history']) proficiencies.skills.push('history');
      if (apiChar.skills['insight']) proficiencies.skills.push('insight');
      if (apiChar.skills['intimidation']) proficiencies.skills.push('intimidation');
      if (apiChar.skills['investigation']) proficiencies.skills.push('investigation');
      if (apiChar.skills['medicine']) proficiencies.skills.push('medicine');
      if (apiChar.skills['nature']) proficiencies.skills.push('nature');
      if (apiChar.skills['perception']) proficiencies.skills.push('perception');
      if (apiChar.skills['performance']) proficiencies.skills.push('performance');
      if (apiChar.skills['persuasion']) proficiencies.skills.push('persuasion');
      if (apiChar.skills['religion']) proficiencies.skills.push('religion');
      if (apiChar.skills['sleightOfHand']) proficiencies.skills.push('sleight of hand');
      if (apiChar.skills['stealth']) proficiencies.skills.push('stealth');
      if (apiChar.skills['survival']) proficiencies.skills.push('survival');
    }
    
    // Se houver outras proficiências na API, adicione aqui
    if (apiChar['languages']) {
      proficiencies.languages = apiChar['languages'] || [];
    }
    
    return proficiencies;
  }
  
  // Extrai equipamentos da resposta da API
  private extractEquipment(apiChar: any): any[] {
    if (!apiChar['equipment']) return [];
    
    // Converte para o formato esperado
    return (apiChar['equipment'] || []).map((item: any) => ({
      id: item.id || `eq-${Math.random().toString(36).substr(2, 9)}`,
      name: item.name || 'Item desconhecido',
      quantity: item.quantity || 1,
      equipped: item.equipped || false
    }));
  }
  
  // Extrai magias da resposta da API
  private extractSpells(apiChar: any): any[] {
    if (!apiChar['spells']) return [];
    
    // Converte para o formato esperado
    return (apiChar['spells'] || []).map((spell: any) => ({
      id: spell.id || `sp-${Math.random().toString(36).substr(2, 9)}`,
      name: spell.name || 'Magia desconhecida',
      level: spell.level || 0,
      prepared: spell.prepared || false
    }));
  }
  
  // Extrai características da resposta da API
  private extractFeatures(apiChar: any): any[] {
    if (!apiChar['features']) return [];
    
    // Converte para o formato esperado
    return (apiChar['features'] || []).map((feature: any) => ({
      name: feature.name || 'Característica desconhecida',
      source: feature.source || 'Desconhecida',
      description: feature.description || 'Sem descrição'
    }));
  }

  // Atualiza um personagem existente
  updateCharacter(id: string, data: Partial<Character>): Observable<any> {
    // Uma implementação simples para a atualização
    // Você pode implementar uma conversão similar à do createCharacter para atualização
    return this.http.put(`${this.baseUrl}/personagens/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Exclui um personagem
  deleteCharacter(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/personagens/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Calcula o bônus de atributo com base no valor
  calculateAttributeModifier(attributeValue: number): number {
    return Math.floor((attributeValue - 10) / 2);
  }

  // Calcula o bônus de proficiência com base no nível
  calculateProficiencyBonus(level: number): number {
    return Math.ceil(1 + (level / 4));
  }
} 