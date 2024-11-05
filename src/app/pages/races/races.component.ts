import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { Router } from '@angular/router';
import { Race } from '../../models/race';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  races!: { count: number, results: Race[] };
  loading: boolean = true;
  error: string = '';

  constructor(
    private raceService: RaceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.raceService.getRaces().subscribe({
      next: (data) => {
        this.races = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar as raças.';
        this.loading = false;
      }
    });
  }

  goToDetail(index: string): void {
    this.router.navigate(['/races', index]);
  }

}
