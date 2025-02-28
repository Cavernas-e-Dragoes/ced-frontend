import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isAuthenticated = false;
  userName = '';


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateAuthStatus();
  }

  updateAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
    this.updateAuthStatus();
  }

}
