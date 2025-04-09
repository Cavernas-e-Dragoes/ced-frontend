import { Component, OnInit } from '@angular/core';
import { EquipsService } from '../../../services/equips.service';
import { Equip } from '../../../models/equip';
import { EquipCategoriaResposta } from '../../../models/equip-categoria-resposta';

@Component({
  selector: 'app-ferramentas',
  templateUrl: './ferramentas.component.html',
  styleUrls: ['./ferramentas.component.css']
})
export class FerramentasComponent implements OnInit {
  subcategorias = [
    { nome: 'Ferramentas', endpoint: 'ferramentas' },
    { nome: 'Kits', endpoint: 'kits' },
    { nome: 'Conjuntos de Jogos', endpoint: 'conjuntos-de-jogos' },
    { nome: 'Equipamento de Aventura', endpoint: 'equipamento-de-aventura' },
    { nome: 'Equipamento Padrão', endpoint: 'equipamento-padrao' },
    { nome: 'Pacotes de Equipamento', endpoint: 'pacotes-de-equipamento' },
    { nome: 'Instrumentos Musicais', endpoint: 'instrumentos-musicais' },
    { nome: 'Outras Ferramentas', endpoint: 'outras-ferramentas' }
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

  // Verifica se o equipamento tem categoria de ferramenta
  hasToolCategory(item: any): boolean {
    return item && (item.tool_category || item.gear_category || item.equipment_category);
  }

  // Obtém o nome da categoria da ferramenta
  getToolCategoryName(item: any): string {
    if (!this.hasToolCategory(item)) {
      return 'Ferramenta';
    }
    
    if (item.tool_category) {
      return item.tool_category;
    } else if (item.gear_category) {
      return item.gear_category;
    } else if (item.equipment_category) {
      return item.equipment_category.name;
    }
    
    return 'Ferramenta';
  }
}
