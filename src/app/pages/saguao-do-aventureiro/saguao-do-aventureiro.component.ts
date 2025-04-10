import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SaudacaoMedievalService } from 'src/app/services/saudacao-medieval.service';

@Component({
  selector: 'app-saguao-do-aventureiro',
  templateUrl: './saguao-do-aventureiro.component.html',
  styleUrls: ['./saguao-do-aventureiro.component.css']
})
export class SaguaoDoAventureiroComponent implements OnInit {
  userName = '';
  saudacaoCompleta = '';
  
  constructor(
    private authService: AuthService, 
    private saudacaoService: SaudacaoMedievalService
  ) {}

  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.saudacaoCompleta = this.saudacaoService.getSaudacao(this.userName);
  }
}
