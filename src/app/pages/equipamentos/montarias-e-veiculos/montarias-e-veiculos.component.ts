import { Component, OnInit } from '@angular/core';
import { EquipsService } from '../../../services/equips.service';
import { Equip } from '../../../models/equip';
import { EquipCategoriaResposta } from '../../../models/equip-categoria-resposta';

@Component({
  selector: 'app-montarias-e-veiculos',
  templateUrl: './montarias-e-veiculos.component.html',
  styleUrls: ['./montarias-e-veiculos.component.css']
})
export class MontariasEVeiculosComponent implements OnInit {
  subcategorias = [
    { nome: 'Montarias e Veículos', endpoint: 'montarias-e-veiculos' },
    { nome: 'Montarias', endpoint: 'montarias' },
    { nome: 'Veículos Terrestres', endpoint: 'veiculos-terrestres' },
    { nome: 'Veículos Aquáticos', endpoint: 'veiculos-aquaticos' }
  ];

  equipamentos: Equip[] = [];  // Lista de equipamentos
  itemDetalhes: Equip | null = null;  // Detalhes do item a serem exibidos no popup
  exibirPopup = false;  // Controla a exibição do popup
  subcategoriaAtiva: string = ''; // Controla qual subcategoria está ativa
  carregando: boolean = false; // Controla o estado de carregamento

  constructor(private equipsService: EquipsService) {}

  ngOnInit(): void {
    // Inicialização, se necessário
  }

  // Carrega equipamentos de uma subcategoria
  carregarEquipamentos(subcategoria: string): void {
    this.carregando = true;
    this.subcategoriaAtiva = subcategoria;
    this.equipamentos = []; // Limpa a lista antes de carregar novos
    
    this.equipsService.getEquipamentosPorSubcategoria(subcategoria).subscribe({
      next: (resposta: EquipCategoriaResposta) => {
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
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar equipamentos:', error);
        this.carregando = false;
      }
    });
  }

  // Carrega os detalhes do item
  carregarDetalhesItem(url: string | undefined): void {
    if (url) {
      this.carregando = true;
      // Garantir que a URL tem o formato correto antes de tentar pegar o item
      const itemId = url.split('/').pop() || '';
      if (itemId) {
        this.equipsService.getEquipamentoDetalhes(itemId).subscribe({
          next: (item: Equip) => {
            this.itemDetalhes = item;
            this.exibirPopup = true;
            this.carregando = false;
          },
          error: (error) => {
            console.error('Erro ao carregar detalhes do item:', error);
            this.carregando = false;
          }
        });
      } else {
        console.error('ID do item inválido');
        this.carregando = false;
      }
    } else {
      console.error('URL inválida');
      this.carregando = false;
    }
  }

  // Fecha o popup
  fecharPopup(): void {
    this.exibirPopup = false;  // Fecha o popup
    this.itemDetalhes = null;  // Limpa os detalhes
  }

  // Verifica se o veículo tem detalhes específicos
  hasVehicleDetails(item: any): boolean {
    return item && (
      item.vehicle_category || 
      item.capacity || 
      (item.special && item.special.length > 0)
    );
  }

  // Obtém os detalhes do veículo formatados
  getVehicleDetails(item: any): string {
    if (!this.hasVehicleDetails(item)) {
      return 'Sem detalhes';
    }
    
    let details = [];
    
    if (item.vehicle_category) {
      details.push(`Tipo: ${item.vehicle_category}`);
    }
    
    if (item.capacity) {
      details.push(`Capacidade: ${item.capacity}`);
    }
    
    if (item.special && item.special.length > 0) {
      details.push(`Especial: ${item.special.join(', ')}`);
    }
    
    return details.join(' | ');
  }

  // Verifica se o veículo tem informações de velocidade
  hasVehicleSpeed(item: any): boolean {
    return item && (
      item.speed || 
      (item.speed && item.speed.quantity) || 
      item.vehicle_speed
    );
  }

  // Obtém a velocidade do veículo formatada
  getVehicleSpeed(item: any): string {
    if (!this.hasVehicleSpeed(item)) {
      return 'Velocidade não especificada';
    }
    
    if (item.speed && typeof item.speed === 'object') {
      return `${item.speed.quantity} ${item.speed.unit}`;
    } else if (item.speed) {
      return `${item.speed}`;
    } else if (item.vehicle_speed) {
      return `${item.vehicle_speed}`;
    }
    
    return 'Velocidade não especificada';
  }
}
