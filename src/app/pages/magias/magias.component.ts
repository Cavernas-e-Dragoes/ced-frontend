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

  constructor(private magicService: MagicService,
              private router: Router) {}

              ngOnInit(): void {
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

              goToDetail(index: string): void {
                this.router.navigate(['/magias', index]);
              }

}
 