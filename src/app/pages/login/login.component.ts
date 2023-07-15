import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  catchJWT(): void {
    const loginUser = {
      login: this.login,
      password: this.password
    };

    this.authService.validUser(loginUser)
      .subscribe(
        response => {
          sessionStorage.setItem("logged", "on");
          sessionStorage.setItem("token", response);
          this.session(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  session(token: string): void {
    this.authService.login(token)
      .subscribe(
        response => {
          sessionStorage.setItem("name", response.name);
          sessionStorage.setItem("email", response.email);
          sessionStorage.setItem("login", response.login);
          this.route.navigateByUrl('/characters'); 
        },
        error => {
          console.log(error);
        }
      );
  }
}
