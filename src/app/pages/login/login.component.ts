import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['aaahhtsuv@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.loginUser(formData).subscribe({
        next: (response: any) => {
          console.log('Usuário logado com sucesso:', response);
          this.router.navigate(['/home']); // Redireciona para a página inicial ou para onde desejar
        },
        error: (error: any) => {
          console.error('Erro ao fazer login:', error);
          // Aqui você pode adicionar lógica para mostrar uma mensagem ao usuário, se desejar
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }
  

}
