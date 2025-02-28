import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';


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

  atributoNomes: Array<'forca' | 'destreza' | 'constituicao' | 'inteligencia' | 'sabedoria' | 'carisma'> = [
    'forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'
  ];

  racas = [
    { nome: 'Humano', img: undefined }, { nome: 'Elfo', img: undefined },
    { nome: 'Anão', img: undefined }, { nome: 'Halfling', img: undefined },
    { nome: 'Gnomo', img: undefined }, { nome: 'Meio-Orc', img: undefined },
    { nome: 'Meio-Elfo', img: undefined }, { nome: 'Draconato', img: undefined },
    { nome: 'Tiefling', img: undefined }
  ];

  classes = [
    { nome: 'Bárbaro', img: undefined }, { nome: 'Bardo', img: undefined },
    { nome: 'Bruxo', img: undefined }, { nome: 'Clérigo', img: undefined },
    { nome: 'Druida', img: undefined }, { nome: 'Feiticeiro', img: undefined },
    { nome: 'Guerreiro', img: undefined }, { nome: 'Ladino', img: undefined },
    { nome: 'Mago', img: undefined }, { nome: 'Monge', img: undefined },
    { nome: 'Paladino', img: undefined }, { nome: 'Patrulheiro', img: undefined }
  ];
  
  personagem = {
    raca: '',
    classe: '',
    atributos: {
      forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0
    }
  };

  selecionarRaca(raca: string) {
    this.personagem.raca = raca;
    this.etapa = 2;
  }

  selecionarClasse(classe: string) {
    this.personagem.classe = classe;
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
      this.personagem.atributos[atributo] = this.rolarDado();
    });
  }

  rolarDado(): number {
    let rolagens = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    return rolagens.sort((a, b) => a - b).slice(1).reduce((a, b) => a + b, 0);
  }

  avancarEtapa() {
    if (this.etapa === 3 && Object.values(this.personagem.atributos).some(val => val === 0)) {
      alert("Defina os atributos antes de continuar!");
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
    console.log("Personagem criado com sucesso:", this.personagem);
    alert("Personagem criado com sucesso! Retornando ao Saguão do Aventureiro.");
    this.reiniciarFormulario();
  }

  reiniciarFormulario() {
    this.etapa = 1;
    this.metodoAtributos = null;
    this.personagem = {
      raca: '',
      classe: '',
      atributos: { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }
    };
  }
}
