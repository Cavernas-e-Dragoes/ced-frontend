import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../services/class.service';
import { ClassDetail } from '../../models/class-detail';
import { Location } from '@angular/common';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  classDetail!: ClassDetail;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const index = this.route.snapshot.paramMap.get('index');
    if (index) {
      this.classService.getClassDetail(index).subscribe({
        next: (data) => {
          this.classDetail = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar detalhes da classe.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Classe não encontrada.';
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/classes']);
  }
}
