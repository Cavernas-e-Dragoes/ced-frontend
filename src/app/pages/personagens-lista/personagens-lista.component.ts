import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Router } from '@angular/router';
import { CharacterListItem } from '../../models/character';

@Component({
  selector: 'app-personagens-lista',
  templateUrl: './personagens-lista.component.html',
  styleUrls: ['./personagens-lista.component.css']
})
export class PersonagensListaComponent implements OnInit {
  @Input() isSaguaoMode: boolean = false;
  personagens: CharacterListItem[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  carregarPersonagens(): void {
    this.isLoading = true;
    this.characterService.listCharacters().subscribe({
      next: (personagens) => {
        console.log('Personagens recebidos no componente:', personagens);
        this.personagens = personagens;
        console.log('Personagens atribuídos ao componente:', this.personagens);
        this.isLoading = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = 'Erro ao carregar personagens';
        this.isLoading = false;
        console.error('Erro ao carregar personagens:', error);
      }
    });
  }

  verDetalhes(id: string): void {
    this.router.navigate(['/personagens', id]);
  }

  editarPersonagem(id: string): void {
    this.router.navigate(['/personagens/editar', id]);
  }

  excluirPersonagem(id: string): void {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      this.isLoading = true;
      this.characterService.deleteCharacter(id).subscribe({
        next: () => {
          this.isLoading = false;
          this.carregarPersonagens(); // Recarregar lista
        },
        error: (error) => {
          this.isError = true;
          this.errorMessage = 'Erro ao excluir personagem';
          this.isLoading = false;
          console.error('Erro ao excluir personagem:', error);
        }
      });
    }
  }

  criarNovoPersonagem(): void {
    this.router.navigate(['/criar-personagem']);
  }

  // Método auxiliar para depuração
  getTypeOf(value: any): string {
    return typeof value;
  }
} 