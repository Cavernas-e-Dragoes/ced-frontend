import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.registerUser(formData).subscribe({
        next: (response: any) => {
          console.log('Usuário criado com sucesso:', response);
          this.router.navigate(['/login']); // Redireciona para a página de login
        },
        error: (error: any) => {  // Declara o tipo 'any' para o parâmetro error
          console.error('Erro ao criar usuário:', error);
         
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }
  
}
