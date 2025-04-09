import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  userName = '';
  isScrolled = false;
  currentRoute = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateAuthStatus();
    
    // Inicializa a rota atual
    this.currentRoute = this.router.url;
    
    // Monitora mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  isActive(route: string): boolean {
    // Tratamento especial para a home
    if (route === '/home' && (this.currentRoute === '/' || this.currentRoute === '/home')) {
      return true;
    }

    // Verifica se a rota atual começa com a rota do menu
    return this.currentRoute.startsWith(route);
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
