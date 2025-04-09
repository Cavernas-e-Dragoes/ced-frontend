import { Component, OnInit } from '@angular/core';
import { EquipsService } from '../../../services/equips.service';
import { Equip } from '../../../models/equip';
import { EquipCategoriaResposta } from '../../../models/equip-categoria-resposta';

@Component({
  selector: 'app-itens-magicos',
  templateUrl: './itens-magicos.component.html',
  styleUrls: ['./itens-magicos.component.css']
})
export class ItensMagicosComponent implements OnInit {
  subcategorias = [
    { nome: 'Itens Mágicos', endpoint: 'itens-maravilhosos' },
    { nome: 'Armas', endpoint: 'armas-magicas' },
    { nome: 'Armaduras', endpoint: 'armaduras-magicas' },
    { nome: 'Poções', endpoint: 'pocoes' },
    { nome: 'Pergaminhos', endpoint: 'pergaminhos' },
    { nome: 'Varinhas', endpoint: 'varinhas' },
    { nome: 'Anéis', endpoint: 'aneis' },
    { nome: 'Bastões', endpoint: 'bastoes' }
  ];

  equipamentos: Equip[] = [];  // Lista de equipamentos
  equipamentosFiltrados: Equip[] = []; // Lista de equipamentos filtrados pela busca
  itemDetalhes: any = null;  // Detalhes do item a serem exibidos no popup - usando any para permitir campos extras
  exibirPopup = false;  // Controla a exibição do popup
  subcategoriaAtiva: string = ''; // Controla qual subcategoria está ativa
  carregando: boolean = false; // Controla o estado de carregamento
  termoBusca: string = ''; // Termo para busca manual de itens

  constructor(private equipsService: EquipsService) {}

  ngOnInit(): void {
    // Inicialização, se necessário
  }

  // Carrega equipamentos de uma subcategoria
  carregarEquipamentos(subcategoria: string): void {
    // Se a subcategoria clicada já está ativa, desseleciona
    if (this.subcategoriaAtiva === subcategoria) {
      this.subcategoriaAtiva = '';
      this.equipamentos = [];
      this.equipamentosFiltrados = [];
      this.termoBusca = '';
      return;
    }
    
    this.carregando = true;
    this.subcategoriaAtiva = subcategoria;
    this.equipamentos = []; // Limpa a lista antes de carregar novos
    this.equipamentosFiltrados = []; // Limpa a lista filtrada
    this.termoBusca = ''; // Limpa o termo de busca ao trocar de categoria
    
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
        this.equipamentosFiltrados = [...this.equipamentos]; // Inicializa a lista filtrada com todos os itens
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar equipamentos:', error);
        this.carregando = false;
      }
    });
  }

  // Função auxiliar para normalizar texto (remover acentos, etc)
  private normalizarTexto(texto: string): string {
    if (!texto) return '';
    return texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '');
  }

  // Filtra itens por palavras-chave, permitindo busca mais flexível
  private filtrarPorPalavrasChave(itens: Equip[], termo: string): Equip[] {
    if (!termo.trim()) return itens;
    
    // Normalizar o termo de busca
    const termoNormalizado = this.normalizarTexto(termo);
    
    // Se o termo tem menos de 2 caracteres, não filtrar
    if (termoNormalizado.length < 2) return itens;
    
    // Dividir em palavras e manter todas, mesmo as curtas
    const palavrasChave = termoNormalizado.split(/\s+/).filter(palavra => palavra.length > 0);
    
    // Filtrar itens que contêm qualquer uma das palavras-chave
    return itens.filter(item => {
      const nomeNormalizado = this.normalizarTexto(item.name);
      
      // Verifica se o nome completo contém o termo exato
      if (nomeNormalizado.includes(termoNormalizado)) {
        return true;
      }
      
      // Verifica se o nome contém qualquer uma das palavras-chave individualmente
      return palavrasChave.some(palavra => nomeNormalizado.includes(palavra));
    });
  }

  // Filtrar equipamentos pelo termo de busca - usado quando uma subcategoria está selecionada
  filtrarEquipamentos(): void {
    if (!this.termoBusca.trim()) {
      this.equipamentosFiltrados = [...this.equipamentos];
      return;
    }
    
    this.equipamentosFiltrados = this.filtrarPorPalavrasChave(this.equipamentos, this.termoBusca);
  }

  // Buscar itens por nome diretamente na API, sem exigir seleção de subcategoria
  buscarItemsPorNome(): void {
    // Se já tiver subcategoria ativa, usa o filtro normal para a lista já carregada
    if (this.subcategoriaAtiva) {
      this.filtrarEquipamentos();
      return;
    }
    
    // Se o campo de busca estiver vazio, limpa os resultados
    if (!this.termoBusca.trim()) {
      this.equipamentos = [];
      this.equipamentosFiltrados = [];
      return;
    }
    
    // Se não tiver subcategoria ativa mas tiver termo de busca com pelo menos 2 caracteres
    if (this.termoBusca.trim().length >= 2) {
      this.carregando = true;
      // Limpar resultados anteriores enquanto carrega
      this.equipamentos = [];
      this.equipamentosFiltrados = [];
      
      // Array para armazenar todos os equipamentos
      let todosEquipamentos: Equip[] = [];
      const termo = this.termoBusca.trim();
      
      // Contador para controlar quando todas as requisições foram concluídas
      let contadorRequisicoes = 0;
      
      // Para cada subcategoria, buscar seus equipamentos
      this.subcategorias.forEach(subcategoria => {
        this.equipsService.getEquipamentosPorSubcategoria(subcategoria.endpoint)
          .subscribe({
            next: (resposta: EquipCategoriaResposta) => {
              // Verificar se há equipamentos na resposta
              if (resposta && resposta.equipment) {
                // Mapear todos os equipamentos desta categoria
                const equipamentosCategoria = resposta.equipment.map(equip => ({
                  index: equip.index,
                  name: equip.name,
                  equipmentCategory: equip.equipmentCategory,
                  gearCategory: equip.gearCategory,
                  cost: equip.cost,
                  weight: equip.weight,
                  desc: equip.desc,
                  url: equip.url
                }));
                
                // Aplicar o filtro por palavras-chave a este conjunto
                const equipamentosFiltrados = this.filtrarPorPalavrasChave(equipamentosCategoria, termo);
                
                // Adicionar os resultados filtrados ao conjunto total
                todosEquipamentos = todosEquipamentos.concat(equipamentosFiltrados);
              }
              
              // Incrementar contador de requisições
              contadorRequisicoes++;
              
              // Se todas as requisições terminaram, atualizar a interface
              if (contadorRequisicoes === this.subcategorias.length) {
                this.equipamentos = todosEquipamentos;
                this.equipamentosFiltrados = todosEquipamentos;
                this.carregando = false;
              }
            },
            error: (error) => {
              console.error(`Erro ao buscar itens na categoria ${subcategoria.nome}:`, error);
              
              // Mesmo com erro, incrementar contador
              contadorRequisicoes++;
              
              // Se todas as requisições terminaram, atualizar a interface
              if (contadorRequisicoes === this.subcategorias.length) {
                this.carregando = false;
              }
            }
          });
      });
    }
  }
  
  // Limpar campo de busca
  limparBusca(): void {
    this.termoBusca = '';
    
    if (this.subcategoriaAtiva) {
      // Se tiver subcategoria ativa, mostra todos os itens dela
      this.filtrarEquipamentos();
    } else {
      // Se não tiver subcategoria ativa, limpa todos os resultados
      this.equipamentos = [];
      this.equipamentosFiltrados = [];
    }
  }

  // Carrega os detalhes do item
  carregarDetalhesItem(url: string | undefined): void {
    if (url) {
      this.carregando = true;
      // Garantir que a URL tem o formato correto antes de tentar pegar o item
      const itemId = url.split('/').pop() || '';
      if (itemId) {
        this.equipsService.getEquipamentoDetalhes(itemId).subscribe({
          next: (item: any) => {
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

  // Verifica se o item mágico tem propriedades especiais
  hasMagicProperties(item: any): boolean {
    // Verificar se o item tem propriedades mágicas
    return item && (
      item.requires_attunement ||
      item.charges || 
      item.recharge || 
      item.bonus || 
      (item.properties && item.properties.length > 0)
    );
  }

  getMagicPropertiesDescription(item: any): string {
    const props = [];
    
    if (item.requires_attunement) {
      props.push('Requer sintonização');
    }
    
    if (item.charges) {
      props.push(`${item.charges} cargas`);
    }
    
    if (item.recharge) {
      props.push(`Recarrega: ${item.recharge}`);
    }
    
    if (item.bonus) {
      props.push(`Bônus: ${item.bonus}`);
    }
    
    if (item.properties && item.properties.length > 0) {
      props.push(item.properties.join(', '));
    }
    
    return props.join(', ');
  }
}

