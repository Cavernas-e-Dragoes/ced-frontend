import { Component, OnInit } from '@angular/core';
import { EquipsService } from '../../../services/equips.service';
import { Equip } from '../../../models/equip';
import { EquipCategoriaResposta } from '../../../models/equip-categoria-resposta';

@Component({
  selector: 'app-ataque',
  templateUrl: './ataque.component.html',
  styleUrls: ['./ataque.component.css']
})
export class AtaqueComponent implements OnInit {
  subcategorias = [
    { nome: 'Armas', endpoint: 'arma' },
    { nome: 'Munição', endpoint: 'municao' },
    { nome: 'Armas Simples', endpoint: 'armas-simples' },
    { nome: 'Armas Marciais', endpoint: 'armas-marcial' },
    { nome: 'Armas Corpo a Corpo', endpoint: 'armas-corpo-a-corpo' },
    { nome: 'Armas a Distância', endpoint: 'armas-a-distancia' }
  ];

  equipamentos: Equip[] = [];  // Lista de equipamentos
  itemDetalhes: Equip | null = null;  // Detalhes do item a serem exibidos no popup
  exibirPopup = false;  // Controla a exibição do popup

  constructor(private equipsService: EquipsService) {}

  ngOnInit(): void {
    // Inicialização, se necessário
  }

  // Carrega equipamentos de uma subcategoria
  carregarEquipamentos(subcategoria: string): void {
    this.equipsService.getEquipamentosPorSubcategoria(subcategoria).subscribe((resposta: EquipCategoriaResposta) => {
      this.equipamentos = resposta.equipment.map(equip => ({
        index: equip.index,
        name: equip.name,
        equipmentCategory: equip.equipmentCategory,
        gearCategory: equip.gearCategory,
        cost: equip.cost,
        weight: equip.weight,
        desc: equip.desc,
        url: equip.url
      }));
    });
  }

  // Carrega os detalhes do item
  carregarDetalhesItem(url: string | undefined): void {
    if (url) {
      // Garantir que a URL tem o formato correto antes de tentar pegar o item
      const itemId = url.split('/').pop() || '';
      if (itemId) {
        this.equipsService.getEquipamentoDetalhes(itemId).subscribe((item: Equip) => {
          this.itemDetalhes = item;
          this.exibirPopup = true;
        });
      } else {
        console.error('ID do item inválido');
      }
    } else {
      console.error('URL inválida');
    }
  }

  // Fecha o popup
  fecharPopup(): void {
    this.exibirPopup = false;  // Fecha o popup
    this.itemDetalhes = null;  // Limpa os detalhes
  }
}