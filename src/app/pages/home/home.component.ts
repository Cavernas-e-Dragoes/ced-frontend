import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrolled = window.pageYOffset;
    
    // Ajusta a posição dos pontos de luz com diferentes velocidades
    const light1 = document.querySelector('.light-1');
    const light2 = document.querySelector('.light-2');
    const light3 = document.querySelector('.light-3');
    const light4 = document.querySelector('.light-4');
    const light5 = document.querySelector('.light-5');
    const light6 = document.querySelector('.light-6');
    const light7 = document.querySelector('.light-7');
    const light8 = document.querySelector('.light-8');

    if (light1) light1.setAttribute('style', `transform: translateY(${scrolled * 0.05}px)`);
    if (light2) light2.setAttribute('style', `transform: translateY(${scrolled * 0.08}px)`);
    if (light3) light3.setAttribute('style', `transform: translateY(${scrolled * 0.12}px)`);
    if (light4) light4.setAttribute('style', `transform: translateY(${scrolled * 0.15}px)`);
    if (light5) light5.setAttribute('style', `transform: translateY(${scrolled * 0.18}px)`);
    if (light6) light6.setAttribute('style', `transform: translateY(${scrolled * 0.1}px)`);
    if (light7) light7.setAttribute('style', `transform: translateY(${scrolled * 0.13}px)`);
    if (light8) light8.setAttribute('style', `transform: translateY(${scrolled * 0.16}px)`);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
