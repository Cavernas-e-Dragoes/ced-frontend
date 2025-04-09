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

  // Verifica se o equipamento tem propriedades de dano
  isDamageEquipment(item: any): boolean {
    return item && item.damage && item.damage.damage_dice && item.damage.damage_type;
  }

  // Obtém a descrição do dano do equipamento
  getDamageDescription(item: any): string {
    if (!this.isDamageEquipment(item)) {
      return 'N/A';
    }
    return `${item.damage.damage_dice} ${item.damage.damage_type.name}`;
  }

  // Verifica se o equipamento tem propriedades
  hasProperties(item: any): boolean {
    return item && item.properties && Array.isArray(item.properties) && item.properties.length > 0;
  }

  // Obtém a descrição das propriedades do equipamento
  getPropertiesDescription(item: any): string {
    if (!this.hasProperties(item)) {
      return 'Nenhuma';
    }
    return item.properties.map((prop: any) => prop.name).join(', ');
  }
}