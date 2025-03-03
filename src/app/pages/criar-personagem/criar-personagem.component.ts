import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { Router } from '@angular/router';
import { ClassService } from '../../services/class.service';
import { RaceService } from '../../services/race.service';
import { Class } from '../../models/class';
import { Race } from '../../models/race';

// Estendendo as interfaces para incluir a propriedade img opcional
interface RaceWithImage extends Race {
  img?: string;
}

interface ClassWithImage extends Class {
  img?: string;
}

@Component({
  selector: 'app-criar-personagem',
  templateUrl: './criar-personagem.component.html',
  styleUrls: ['./criar-personagem.component.css'],
  animations: [
    trigger('virarPagina', [
      transition(':enter', [
        style({ transform: 'rotateY(90deg)', opacity: 0 }), // Começa fechada
        animate(
          '600ms ease-out',
          keyframes([
            style({ transform: 'rotateY(45deg)', opacity: 0.5, offset: 0.5 }),
            style({ transform: 'rotateY(0deg)', opacity: 1, offset: 1 })
          ])
        )
      ]),
      transition(':leave', [
        animate(
          '600ms ease-in',
          keyframes([
            style({ transform: 'rotateY(0deg)', opacity: 1, offset: 0 }),
            style({ transform: 'rotateY(-45deg)', opacity: 0.5, offset: 0.5 }),
            style({ transform: 'rotateY(-90deg)', opacity: 0, offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class CriarPersonagemComponent {
  etapa: number = 1;
  metodoAtributos: 'rolagem' | 'manual' | null = null;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  racas: RaceWithImage[] = [];
  classes: ClassWithImage[] = [];

  atributoNomes: Array<'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'> = [
    'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'
  ];

  nomesAtributosPortugues = {
    'strength': 'Força',
    'dexterity': 'Destreza',
    'constitution': 'Constituição',
    'intelligence': 'Inteligência',
    'wisdom': 'Sabedoria',
    'charisma': 'Carisma'
  };

  personagem: Character = this.inicializarPersonagem();

  constructor(
    public characterService: CharacterService,
    private classService: ClassService,
    private raceService: RaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarRacas();
    this.carregarClasses();
  }

  carregarRacas() {
    this.isLoading = true;
    this.raceService.getRaces().subscribe({
      next: (response: any) => {
        this.racas = response.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = 'Erro ao carregar raças';
        this.isLoading = false;
        console.error('Erro ao carregar raças:', error);
      }
    });
  }

  carregarClasses() {
    this.isLoading = true;
    this.classService.getClasses().subscribe({
      next: (response: any) => {
        this.classes = response.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = 'Erro ao carregar classes';
        this.isLoading = false;
        console.error('Erro ao carregar classes:', error);
      }
    });
  }

  inicializarPersonagem(): Character {
    return {
      userId: '',
      name: '',
      level: 1,
      experience: 0,
      race: {
        index: '',
        name: '',
        url: ''
      },
      class: {
        index: '',
        name: '',
        url: ''
      },
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      },
      background: '',
      alignment: '',
      hitPoints: {
        maximum: 0,
        current: 0,
        temporary: 0
      },
      armorClass: 10,
      initiative: 0,
      speed: 30,
      proficiencies: {
        savingThrows: [],
        skills: [],
        languages: [],
        tools: [],
        weapons: [],
        armors: []
      },
      equipment: [],
      features: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  selecionarRaca(raca: Race) {
    this.personagem.race = {
      index: raca.index,
      name: raca.name,
      url: raca.url
    };
    this.etapa = 2;
  }

  selecionarClasse(classe: Class) {
    this.personagem.class = {
      index: classe.index,
      name: classe.name,
      url: classe.url
    };
    this.etapa = 3;
  }

  escolherMetodoAtributos(metodo: 'rolagem' | 'manual') {
    this.metodoAtributos = metodo;
    if (metodo === 'rolagem') {
      this.rolarAtributos();
    }
  }

  usarDistribuicaoPontos() {
    this.metodoAtributos = 'manual';
  }

  rolarAtributos() {
    this.metodoAtributos = 'rolagem';
    this.atributoNomes.forEach(atributo => {
      this.personagem.attributes[atributo] = this.rolarDado();
    });
  }

  rolarDado(): number {
    let rolagens = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    // Retorna a soma dos 3 maiores valores
    return rolagens.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
  }

  avancarEtapa() {
    if (this.etapa === 3 && Object.values(this.personagem.attributes).some(val => val === 0)) {
      alert("Defina os atributos antes de continuar!");
      return;
    }

    if (this.etapa === 4) {
      this.etapa = 5; // Adiciona etapa para nome e background
      return;
    }

    this.etapa++;
  }

  voltarEtapa() {
    if (this.etapa > 1) {
      if (this.etapa === 4) {
        this.metodoAtributos = null;
      }
      this.etapa--;
    }
  }

  finalizarCriacao() {
    // Verificar campos obrigatórios
    if (!this.personagem.name || this.personagem.name.trim() === '') {
      alert('Por favor, preencha o nome do personagem.');
      return;
    }

    if (!this.personagem.race.index || !this.personagem.class.index) {
      alert('Por favor, selecione raça e classe para o personagem.');
      return;
    }

    // Verifica se pelo menos um atributo foi definido
    const atributos = this.personagem.attributes;
    if (atributos.strength <= 0 || atributos.dexterity <= 0 || 
        atributos.constitution <= 0 || atributos.intelligence <= 0 || 
        atributos.wisdom <= 0 || atributos.charisma <= 0) {
      alert('Por favor, defina todos os atributos do personagem.');
      return;
    }

    // Calcula valores derivados
    this.calcularValoresDerivados();
    
    // Salva o personagem
    this.isLoading = true;
    this.characterService.createCharacter(this.personagem).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert("Personagem criado com sucesso! Redirecionando para a lista de personagens.");
        this.router.navigate(['/personagens']);
      },
      error: (error) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Erro ao criar personagem';
        console.error('Erro ao criar personagem:', error);
      }
    });
  }

  calcularValoresDerivados() {
    // Calcula pontos de vida baseado na classe
    const constituicaoMod = this.characterService.calculateAttributeModifier(this.personagem.attributes.constitution);
    
    // Para simplificar, vamos supor valores padrão para os dados de vida das classes
    const hitDiceMap = {
      'barbarian': 12,
      'fighter': 10,
      'paladin': 10,
      'ranger': 10,
      'monk': 8,
      'rogue': 8,
      'bard': 8,
      'cleric': 8,
      'druid': 8,
      'warlock': 8,
      'wizard': 6,
      'sorcerer': 6
    };
    
    const classIndex = this.personagem.class.index.toLowerCase();
    const hitDice = hitDiceMap[classIndex as keyof typeof hitDiceMap] || 8;
    
    this.personagem.hitPoints.maximum = hitDice + constituicaoMod;
    this.personagem.hitPoints.current = this.personagem.hitPoints.maximum;
    
    // Iniciativa baseada em destreza
    this.personagem.initiative = this.characterService.calculateAttributeModifier(this.personagem.attributes.dexterity);
  }

  reiniciarFormulario() {
    this.etapa = 1;
    this.metodoAtributos = null;
    this.personagem = this.inicializarPersonagem();
  }
}
