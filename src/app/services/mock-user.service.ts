

interface MockUserService {
    image: string
    title: string
    description: string
    date: Date
    link: string
    ajust?: boolean
  }
  
  const MockUserService: MockUserService[] = [
    {
      title: "Realidade Virtual",
      description: "Jogos eletrônicos e lojas virtuais imersas é estar conectado, inserido na realidade que apresenta o que é proposto por um serviço ou produto. É o destaque que define o fechamento de negócios à distância, ao mesmo tempo que te coloca dentro daquele cenário, como se estivesse lá.",
      date: new Date('2023-02-02'),
      image: '/assets/Images/Banner_Realidade_virtual_desktop_page.jpg',
      link: '/realidade-virtual'
    },
    {
      title: "Liderança - Insights para start ups",
      description: "Procurando uma maneira mais rápida de fazer o storyboard? Ou um novo nicho criativo? Ou simplesmente quer misturar as coisas? Gostamos do “Blender”… Storyboard ou Digital Storytelling são organizadores gráficos tais como uma série de ilustrações ou imagens arranjadas em sequência com o propósito de pré-visualizar um filme, animação ou gráfico animado, incluindo elementos interativos em websites, filmes, vídeos e histórias em quadrinhos. Esperançosamente, podemos sugerir vários recursos que podem ajudar.",
      date: new Date('2022-12-08'),
      image: '/assets/Images/img-insigth-01.jpg',
      link: '/lideranca',
      ajust: true
    },
    {
      title: "O impossível existe?",
      description: "Psicólogos definem a resiliência como o processo de adaptação que leva à ação superando a adversidade, desafios, ameaças… ao buscar a fonte significativa que alimenta a vontade de forma que a motivação se torne atitude em ações constantes, buscando aquilo que se sonha.",
      date: new Date('2023-02-02'),
      image: '/assets/Images/Arte-Blog_posts-alta_5.jpg',
      link: '/o-impossivel',
      ajust: true
    },
    {
      title: "A disciplina é uma arte",
      description: "Após uma carreira de 18 anos na Kforce, uma das principais características que eu acredito que separa o bom do excelente é a capacidade de incutir disciplina em tudo o que você faz. A disciplina é uma arte, um hábito treinado que, uma vez alcançado, o ajudará a levar sua carreira a novos patamares.",
      date: new Date('2023-02-02'),
      image: '/assets/Images/Arte-Blog_posts-alta_4.jpg',
      link: '/a-disciplina',
      ajust: true
    },
    {
      title: "Storyboards – Digital Áudio Visual",
      description: "Procurando uma maneira mais rápida de fazer o storyboard? Ou um novo nicho criativo? Ou simplesmente quer misturar as coisas? Gostamos do “Blender”… Storyboard ou Digital Storytelling são organizadores gráficos tais como uma série de ilustrações ou imagens arranjadas em sequência.",
      date: new Date('2023-02-02'),
      image: '/assets/Images/capa-storyboard.jpg',
      link: '/storyboards',
      ajust: true
    },
    {
      title: "Marketing de Conteúdo",
      description: "“Marketing de Conteúdo digital” está em alta, e desde que as marcas perceberam que seus canais de marketing digital são poderosos, com meios de produção próprios para publicar suas mensagens e informações sem depender da imprensa ou da publicidade para distribuí-las, o marketing de conteúdo digital tornou-se a principal ferramenta de venda.",
      date: new Date('2023-02-02'),
      image: '/assets/Images/capa-mkt-conteudo.jpg',
      link: '/marketing',
      ajust: true
    },
  ]
  
  export default MockUserService
