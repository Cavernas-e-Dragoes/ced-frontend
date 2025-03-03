import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character';

// Interface para atributos que permite indexação por string
interface AttributesMap {
  [key: string]: number;
}

@Component({
  selector: 'app-ficha-de-personagem',
  templateUrl: './ficha-de-personagem.component.html',
  styleUrls: ['./ficha-de-personagem.component.css']
})
export class FichaDePersonagemComponent implements OnInit {
  personagem: Character | null = null;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  atributoNomes: string[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  nomesAtributosPortugues: {[key: string]: string} = {
    'strength': 'Força',
    'dexterity': 'Destreza',
    'constitution': 'Constituição',
    'intelligence': 'Inteligência',
    'wisdom': 'Sabedoria',
    'charisma': 'Carisma'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.carregarPersonagem();
  }

  carregarPersonagem(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.isError = true;
      this.errorMessage = 'ID do personagem não encontrado';
      this.isLoading = false;
      return;
    }

    this.characterService.getCharacter(id).subscribe({
      next: (personagemProcessado: Character) => {
        console.log('Resposta da API processada:', personagemProcessado);
        
        // Usar diretamente o personagem já processado pelo serviço
        this.personagem = personagemProcessado;
        
        // Não precisamos mais adaptar, pois o serviço já fez isso
        this.isLoading = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = 'Erro ao carregar detalhes do personagem: ' + (error.error?.message || error.message || 'Erro desconhecido');
        this.isLoading = false;
        console.error('Erro ao carregar personagem:', error);
      }
    });
  }

  // Mantemos apenas os métodos essenciais usados no template
  extractProficiencies(skills: any): any {
    if (!skills) {
      return {
        savingThrows: [],
        skills: [],
        languages: [],
        tools: [],
        weapons: [],
        armors: []
      };
    }

    // Mapeamento de propriedades para nomes legíveis
    const savingThrowMap: {[key: string]: string} = {
      stStrength: 'Força',
      stDexterity: 'Destreza',
      stConstitution: 'Constituição',
      stIntelligence: 'Inteligência',
      stWisdom: 'Sabedoria',
      stCharisma: 'Carisma'
    };

    const skillMap: {[key: string]: string} = {
      acrobatics: 'Acrobacia',
      animalHandling: 'Adestrar Animais',
      arcana: 'Arcanismo',
      athletics: 'Atletismo',
      deception: 'Enganação',
      history: 'História',
      insight: 'Intuição',
      intimidation: 'Intimidação',
      investigation: 'Investigação',
      medicine: 'Medicina',
      nature: 'Natureza',
      perception: 'Percepção',
      performance: 'Atuação',
      persuasion: 'Persuasão',
      religion: 'Religião',
      sleightOfHand: 'Prestidigitação',
      stealth: 'Furtividade',
      survival: 'Sobrevivência'
    };

    // Resultado a ser retornado
    const result: any = {
      savingThrows: [],
      skills: [],
      languages: [],
      tools: [],
      weapons: [],
      armors: []
    };

    // Processar salvaguardas
    Object.keys(savingThrowMap).forEach(key => {
      if (skills[key]) {
        result.savingThrows.push(savingThrowMap[key]);
      }
    });

    // Processar perícias
    Object.keys(skillMap).forEach(key => {
      if (skills[key]) {
        result.skills.push(skillMap[key]);
      }
    });

    return result;
  }

  voltarParaLista(): void {
    this.router.navigate(['/personagens']);
  }

  editarPersonagem(): void {
    if (this.personagem && this.personagem.id) {
      this.router.navigate(['/personagens/editar', this.personagem.id]);
    }
  }

  temItens(array: any[] | undefined | null): boolean {
    return !!array && array.length > 0;
  }

  getAttributeValue(atributo: string): number {
    if (!this.personagem || !this.personagem.attributes) return 0;
    
    return (this.personagem.attributes as unknown as AttributesMap)[atributo] || 0;
  }
}
