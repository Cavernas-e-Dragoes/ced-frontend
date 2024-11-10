import { Component, OnInit } from '@angular/core';
import { MagicService } from '../../services/magic.service';
import { Magic } from '../../models/magic';
import { Router } from '@angular/router';


@Component({
  selector: 'app-magias',
  templateUrl: './magias.component.html',
  styleUrls: ['./magias.component.css']
})
export class MagiasComponent implements OnInit{

  magias!: { count: number, results: Magic[] };
  loading: boolean = true;
  error: string = '';

   // Filtros
   filters = {
    level: '',
    school: '',
    class: '',
    name: ''
  };

  // Opções para os filtros
levels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
schools: string[] = ['Evocação', 'Conjuração', 'Necromancia', 'Transmutação', 'Adivinhação', 'Encantamento', 'Ilusão', 'Abjuração'];
classes: string[] = ['Mago', 'Feiticeiro', 'Druida', 'Clérigo', 'Paladino', 'Patrulheiro', 'Bardo', 'Bruxo'];



  constructor(private magicService: MagicService,
              private router: Router) {}

              ngOnInit(): void {
                this.loadMagics();
                
              //  this.magicService.getMagics().subscribe({
              //    next: (data) => {
               //     this.magias = data;
                //    this.loading = false;
               //   },
               //   error: (err) => {
               //     this.error = 'Erro ao carregar as magias.';
               //     this.loading = false;
               //   }
              //  });
              }

              loadMagics(): void {
                this.loading = true;
                this.magicService.getMagics().subscribe({
                  next: (data) => {
                    this.magias = data;
                    this.loading = false;
                  },
                  error: (err) => {
                    this.error = 'Erro ao carregar as magias.';
                    this.loading = false;
                  }
                });
              }
              applyFilters(): void {
    this.loading = true;

    const level = this.filters.level ? parseInt(this.filters.level, 10) : undefined;
    const { school, class: className } = this.filters;

    // Verifica se algum filtro foi preenchido
    if (!level && !school && !className) {
        // Se nenhum filtro foi aplicado, pega todas as magias
        this.magicService.getMagics().subscribe({
            next: (data) => {
                this.magias = data;
                this.error = ''; // Limpa qualquer mensagem de erro
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Erro ao carregar as magias.';
                this.loading = false;
            }
        });
    } else {
        // Se algum filtro foi preenchido, aplica o filtro
        this.magicService.getFilteredMagics(level, school, className).subscribe({
            next: (data) => {
                if (data.count === 0) {
                    this.magias = { count: 0, results: [] };
                    this.error = 'Nenhuma magia encontrada com os filtros aplicados.';
                } else {
                    this.magias = data;
                    this.error = ''; // Limpa qualquer mensagem de erro
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Erro ao carregar as magias com os filtros aplicados.';
                this.loading = false;
            }
        });
    }
}

              goToDetail(index: string): void {
                this.router.navigate(['/magias', index]);
              }


}