import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

  onLoginInput(event: any): void {
    this.login = (event.target as HTMLInputElement).value;
  }

  onPasswordInput(event: any): void {
    this.password = (event.target as HTMLInputElement).value;
  }

  singIn(): void {
    const credentials = {
      login: this.login,
      password: this.password
    };

    this.authService.login(credentials)
      .subscribe(
        response => {
          
          sessionStorage.setItem("logged", "on");
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("name", response.user.name);
          sessionStorage.setItem("email", response.user.email);
          sessionStorage.setItem("login", response.user.login);

          this.route.navigateByUrl('/characters'); 

        },
        error => {
          console.log(error);
        }
      );
  }
  onSubmit(event: Event) {
    event.preventDefault();
  }
}
