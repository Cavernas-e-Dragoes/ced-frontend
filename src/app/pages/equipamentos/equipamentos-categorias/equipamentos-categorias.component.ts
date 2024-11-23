import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipsService } from '../../../services/equips.service';
import { EquipCategorias } from '../../../models/equip-categorias';
import { EquipCategoriaResposta } from '../../../models/equip-categoria-resposta';  // Modelo de resposta

@Component({
  selector: 'app-equipamentos-categorias',
  templateUrl: './equipamentos-categorias.component.html',
  styleUrls: ['./equipamentos-categorias.component.css']
})
export class EquipamentosCategoriasComponent implements OnInit {

  categorias = [
    { nome: 'Ataque', link: '/ataque' },
    { nome: 'Defesa', link: '/defesa' },
    { nome: 'Utilitários', link: '/utilitarios' },
    { nome: 'Kits', link: '/kits' },
    { nome: 'Montaria', link: '/montaria' },
    { nome: 'Mágicos', link: '/magicos' }
  ];

  categoria!: string;
  subcategorias: string[] = [];
  equipamentos: EquipCategorias[] = []; // Tipando como EquipCategorias[] para receber o array de equipamentos

  constructor(
    private route: ActivatedRoute,
    private equipsService: EquipsService
  ) {}

  ngOnInit(): void {
    // Pega a categoria da URL
    this.categoria = this.route.snapshot.paramMap.get('categoria')!;
    
    // Preencher com as subcategorias de acordo com a categoria
    this.carregarSubcategorias(this.categoria);
  }

  carregarSubcategorias(categoria: string): void {
    if (categoria === 'Ataque') {
      this.subcategorias = ['arma', 'municao', 'armas-simples', 'armas-marciais', 'armas-corpo-a-corpo', 'armas-a-distancia'];
    } else if (categoria === 'Defesa') {
      this.subcategorias = ['escudos', 'armaduras'];
    } else if (categoria === 'Kits') {
      this.subcategorias = ['equipamento-de-aventura', 'equipamento-padrao', 'kit-de-escalada', 'kit-de-disfarce'];
    } else if (categoria === 'Montaria') {
      this.subcategorias = ['montarias-e-veiculos'];
    } else if (categoria === 'Utilitários') {
      this.subcategorias = ['ferramentas', 'equipamento-de-aventura'];
    }
  }

  carregarEquipamentos(subcategoria: string): void {
    // Chama o serviço para obter os equipamentos dessa subcategoria
    this.equipsService.getEquipamentosPorSubcategoria(subcategoria).subscribe((resposta: EquipCategoriaResposta) => {
      console.log('Equipamentos carregados:', resposta.equipment);
      this.equipamentos = resposta.equipment; // Atribuindo o array de equipamentos à variável equipamentos
    });
  }
}