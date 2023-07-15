import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

    
constructor(private authService: AuthService, private route: Router) {}
      save(name: string, email: string, login: string, password: string): void {
        console.log("teste1");

        // sessionStorage.clear();
     
        const user = new User(name, email, login, password);
        console.log(user);

      this.authService.create(user).subscribe(
        response => {
          
          sessionStorage.setItem("name", response.name);
          this.route.navigateByUrl('/characters');
          
        },
        error => {
          console.log("testeerro");
          console.log(error);
        });
        console.log("teste3");
    }
    onSubmit(event: Event) {
      event.preventDefault();
    
      // Restante do código de manipulação do envio do formulário
    }
    
}
