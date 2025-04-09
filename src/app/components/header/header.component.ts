import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isAuthenticated = false;
  userName = '';
  isScrolled = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateAuthStatus();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  updateAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();
    console.log('[Header] Nome do usuário atualizado:', this.userName);
    console.log('[Header] Valor no localStorage:', localStorage.getItem('user_name'));
  }

  logout() {
    this.authService.logout();
    this.updateAuthStatus();
  }

}
