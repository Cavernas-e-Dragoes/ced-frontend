import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MagicService } from '../../services/magic.service';
import { MagicDetail } from 'src/app/models/magic-detail';

@Component({
  selector: 'app-magic-detail',
  templateUrl: './magic-detail.component.html',
  styleUrls: ['./magic-detail.component.css']
})
export class MagicDetailComponent implements OnInit {
  magicDetail!: MagicDetail;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private magicService: MagicService
  ) {}

  ngOnInit(): void {
    const index = this.route.snapshot.paramMap.get('index');
    if (index) {
      this.magicService.getMagicDetail(index).subscribe({
        next: (data) => {
          this.magicDetail = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar detalhes da magia.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Magia não encontrada.';
      this.loading = false;
    }
  }

}
