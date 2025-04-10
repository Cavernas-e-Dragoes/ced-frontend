import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaudacaoMedievalService {

  private saudacoesPorPeriodo = {
    manha: [
      "O sol ergue-se sobre o saguão, {nome}. Tua jornada começa.",
      "Os primeiros raios de luz guiam teus passos, {nome}.",
      "A alvorada te saúda, {nome}. Hoje é um bom dia para aventuras.",
      "A névoa da madrugada se dissipa, revelando teu caminho, {nome}.",
      "Desperta, {nome}. Os tambores da aventura já ecoam no horizonte.",
      "O orvalho brilha nas folhas enquanto teus passos se iniciam, {nome}.",
      "A luz dourada da manhã abençoa teus primeiros passos, {nome}."
    ],
    tarde: [
      "As sombras se alongam, {nome}. O saguão permanece em vigília.",
      "Mais um capítulo da tua jornada se escreve, {nome}.",
      "A tarde avança, e contigo, bravura e coragem, {nome}.",
      "O sol paira alto, testemunha da tua coragem, {nome}.",
      "As horas avançam como flechas, mas tua determinação não vacila, {nome}.",
      "Em meio ao calor do dia, teu nome sussurra nas lendas, {nome}.",
      "O saguão acolhe teu retorno, bravo andarilho da tarde, {nome}."
    ],
    noite: [
      "As estrelas guiam tua chegada, {nome}.",
      "A noite cai, mas tua chama continua acesa, {nome}.",
      "A lareira crepita suavemente. Descansa, {nome}, o saguão é seguro.",
      "O luar banha o saguão em prata, anunciando tua chegada, {nome}.",
      "Mesmo quando o mundo adormece, tua lenda continua, {nome}.",
      "As sombras se curvam à tua presença, {nome}. Que a noite te seja leve.",
      "Sob o manto da noite, histórias sussurram teu nome, {nome}."
    ],
    neutro: [
      "As portas do saguão se abriram para ti, {nome}.",
      "Tua jornada te trouxe até o Saguão do Aventureiro, {nome}.",
      "O saguão ressoa com os passos de um novo viajante... {nome}.",
      "Sê parte deste refúgio, {nome}.",
      "Teus feitos te conduziram até este lugar, {nome}.",
      "As runas antigas brilham na pedra ao seu toque, {nome}... Seja bem-vindo ao Cavernas e Dragões, onde lendas ganham voz.",
      "O vento sopra poeira de eras esquecidas enquanto você cruza os portões da sabedoria, {nome}. Prepare seus dados.",
      "Sob a luz das estrelas cadentes, o grimório se abre para ti, {nome}. O Cavernas e Dragões te aguarda.",
      "Cavaleiro, maga ou ladino — não importa sua origem. A aventura te chama, {nome}!",
      "Ao atravessar a neblina mágica, {nome}, você encontra o salão dos heróis. O Cavernas e Dragões é seu agora.",
      "As chamas das tochas dançam nas paredes da caverna... uma nova jornada se inicia, {nome}.",
      "O silêncio dos anciãos ecoa nas pedras... mas ao ouvir teu nome, {nome}, até os deuses despertam.",
      "As páginas do destino se voltam para ti, {nome}. Que os dados estejam ao seu favor.",
      "Dos confins do reino digital, você chega ao coração da lenda: seja bem-vindo ao Cavernas e Dragões, {nome}.",
      "Os bardos ainda não cantaram tua história, {nome}... mas aqui, ela começa.",
      "As portas ancestrais rangem ao se abrir… {nome}, o saguão é teu.",
      "O eco de teus passos ressoa como prenúncio de feitos grandiosos, {nome}.",
      "O tempo se curva diante da tua presença, {nome}. Bem-vindo ao saguão.",
      "Chamas antigas reacendem-se em tua honra, {nome}.",
      "Os espíritos dos antigos aventureiros te observam com curiosidade, {nome}."
    ]
  };

  getPeriodoDoDia(): 'manha' | 'tarde' | 'noite' | 'neutro' {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return 'manha';
    if (hora >= 12 && hora < 18) return 'tarde';
    if (hora >= 18 || hora < 5) return 'noite';
    return 'neutro';
  }

  getSaudacao(nome: string): string {
    const periodo = this.getPeriodoDoDia();
    const frases = [...this.saudacoesPorPeriodo[periodo], ...this.saudacoesPorPeriodo.neutro];
    const indice = Math.floor(Math.random() * frases.length);
    return frases[indice].replace('{nome}', nome);
  }
}
