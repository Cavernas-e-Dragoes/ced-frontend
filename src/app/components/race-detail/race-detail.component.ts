import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../../services/race.service';
import { RaceDetail } from '../../models/race-detail';

@Component({
  selector: 'app-race-detail', 
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.css']
})
export class RaceDetailComponent implements OnInit {
  raceDetail!: RaceDetail;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private raceService: RaceService
  ) { }

  ngOnInit(): void {
    const index = this.route.snapshot.paramMap.get('index');
    if (index) {
      this.raceService.getRaceDetail(index).subscribe({
        next: (data) => {
          this.raceDetail = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar detalhes da raça.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Raça não encontrada.';
      this.loading = false;
    }
  }

}
