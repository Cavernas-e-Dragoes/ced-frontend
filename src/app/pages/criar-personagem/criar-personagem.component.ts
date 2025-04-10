import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, keyframes, state, query, animateChild, group } from '@angular/animations';
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
      // Estados explícitos
      state('frente', style({
        transform: 'rotateY(0deg)',
        opacity: 1
      })),
      state('tras', style({
        transform: 'rotateY(0deg)',
        opacity: 1
      })),
      
      // Transição para avançar (página vira da direita para esquerda, como abrindo um livro)
      transition('void => frente', [
        style({ 
          transform: 'rotateY(90deg)',
          opacity: 0.3,
          transformOrigin: 'left center',
          boxShadow: '10px 0 20px rgba(0, 0, 0, 0.2)'
        }),
        animate('500ms cubic-bezier(0.3, 0, 0.3, 1)', keyframes([
          style({ 
            transform: 'rotateY(90deg)', 
            opacity: 0.3, 
            offset: 0,
            transformOrigin: 'left center',
            boxShadow: '10px 0 20px rgba(0, 0, 0, 0.3)'
          }),
          style({ 
            transform: 'rotateY(75deg)', 
            opacity: 0.5, 
            offset: 0.2,
            transformOrigin: 'left center',
            boxShadow: '8px 0 18px rgba(0, 0, 0, 0.3)'
          }),
          style({ 
            transform: 'rotateY(45deg)', 
            opacity: 0.7, 
            offset: 0.5,
            transformOrigin: 'left center',
            boxShadow: '5px 0 15px rgba(0, 0, 0, 0.2)'
          }),
          style({ 
            transform: 'rotateY(20deg)', 
            opacity: 0.9, 
            offset: 0.8,
            transformOrigin: 'left center',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
          }),
          style({ 
            transform: 'rotateY(0deg)', 
            opacity: 1, 
            offset: 1,
            transformOrigin: 'left center',
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
          })
        ]))
      ]),
      
      // Transição para voltar (página vira da esquerda para direita)
      transition('void => tras', [
        style({ 
          transform: 'rotateY(-90deg)',
          opacity: 0.3,
          transformOrigin: 'left center',
          boxShadow: '-10px 0 20px rgba(0, 0, 0, 0.2)'
        }),
        animate('500ms cubic-bezier(0.3, 0, 0.3, 1)', keyframes([
          style({ 
            transform: 'rotateY(-90deg)', 
            opacity: 0.3, 
            offset: 0,
            transformOrigin: 'left center',
            boxShadow: '-10px 0 20px rgba(0, 0, 0, 0.3)'
          }),
          style({ 
            transform: 'rotateY(-75deg)', 
            opacity: 0.5, 
            offset: 0.2,
            transformOrigin: 'left center',
            boxShadow: '-8px 0 18px rgba(0, 0, 0, 0.3)'
          }),
          style({ 
            transform: 'rotateY(-45deg)', 
            opacity: 0.7, 
            offset: 0.5,
            transformOrigin: 'left center',
            boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)'
          }),
          style({ 
            transform: 'rotateY(-20deg)', 
            opacity: 0.9, 
            offset: 0.8,
            transformOrigin: 'left center',
            boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)'
          }),
          style({ 
            transform: 'rotateY(0deg)', 
            opacity: 1, 
            offset: 1,
            transformOrigin: 'left center',
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
          })
        ]))
      ])
    ])
  ]
})
export class CriarPersonagemComponent implements OnInit {
  etapa: number = 1;
  etapaAnterior: number = 0;
  metodoAtributos: 'rolagem' | 'manual' | null = null;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  direcao: 'frente' | 'tras' = 'frente';
  animacaoEmProgresso: boolean = false;
  paginasPreCarregadas: boolean = false;

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
    this.etapa = 1;
    this.direcao = 'frente';
    
    this.carregarRacas();
    this.carregarClasses();
  }

  // Impedir múltiplos cliques durante a animação
  @HostListener('click', ['$event'])
  bloquearCliqueDuranteAnimacao(event: MouseEvent) {
    if (this.animacaoEmProgresso) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  getAnimationState() {
    return this.direcao;
  }

  // Método para navegar para uma etapa específica
  navegarParaEtapa(novaEtapa: number) {
    if (this.animacaoEmProgresso || novaEtapa === this.etapa) return;
    
    // Verificações antes de avançar
    if (novaEtapa === 3 && !this.personagem.class.index) {
      alert('Selecione uma classe antes de definir os atributos.');
      return;
    }
    
    if (novaEtapa === 4 && Object.values(this.personagem.attributes).some(val => val === 0)) {
      alert('Defina todos os atributos antes de continuar.');
      return;
    }
    
    if (novaEtapa === 5 && !this.personagem.name) {
      alert('Preencha as informações do personagem antes de continuar.');
      return;
    }
    
    this.animacaoEmProgresso = true;
    
    // Define a direção da animação
    if (novaEtapa > this.etapa) {
      this.direcao = 'frente';
    } else {
      this.direcao = 'tras';
    }
    
    // Atualiza a etapa
    this.etapaAnterior = this.etapa;
    this.etapa = novaEtapa;
    
    // Permite que a animação termine
    setTimeout(() => {
      this.animacaoEmProgresso = false;
    }, 500);
  }

  selecionarRaca(raca: Race) {
    if (this.animacaoEmProgresso) return;
    
    this.personagem.race = {
      index: raca.index,
      name: raca.name,
      url: raca.url
    };
    
    // Usar o novo método de navegação
    this.navegarParaEtapa(2);
  }

  selecionarClasse(classe: Class) {
    if (this.animacaoEmProgresso) return;
    
    this.personagem.class = {
      index: classe.index,
      name: classe.name,
      url: classe.url
    };
    
    // Usar o novo método de navegação
    this.navegarParaEtapa(3);
  }

  avancarEtapa() {
    if (this.animacaoEmProgresso) return;
    
    if (this.etapa === 3 && Object.values(this.personagem.attributes).some(val => val === 0)) {
      alert("Defina os atributos antes de continuar!");
      return;
    }
    
    // Usar o novo método de navegação
    if (this.etapa === 4) {
      this.navegarParaEtapa(5);
    } else {
      this.navegarParaEtapa(this.etapa + 1);
    }
  }

  voltarEtapa() {
    if (this.animacaoEmProgresso || this.etapa <= 1) return;
    
    if (this.etapa === 4) {
      this.metodoAtributos = null;
    }
    
    // Usar o novo método de navegação
    this.navegarParaEtapa(this.etapa - 1);
  }

  // Método para pré-carregar dados necessários para a próxima etapa
  preCarregarProximaEtapa() {
    if (this.etapa === 1) {
      // Já estamos carregando as classes na inicialização
    } else if (this.etapa === 2) {
      // Pré-carregar tudo o que for necessário para a etapa de atributos
      if (!this.paginasPreCarregadas) {
        this.paginasPreCarregadas = true;
      }
    }
  }

  carregarRacas() {
    this.isLoading = true;
    this.raceService.getRaces().subscribe({
      next: (response: any) => {
        this.racas = response.results || [];
        console.log('Raças carregadas:', this.racas.length);
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
        console.log('Classes carregadas:', this.classes.length);
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
