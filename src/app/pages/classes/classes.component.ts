import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models/class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes!: { count: number, results: Class[] };
  loading: boolean = true;
  error: string = '';

  constructor(private classService: ClassService,
              private router: Router) { }

              ngOnInit(): void {
                this.classService.getClasses().subscribe({
                  next: (data) => {
                    this.classes = data;
                    this.loading = false;
                  },
                  error: (err) => {
                    this.error = 'Erro ao carregar as classes.';
                    this.loading = false;
                  }
                });
              }
            
              goToDetail(index: string): void {
                this.router.navigate(['/classes', index]);
              }



}
