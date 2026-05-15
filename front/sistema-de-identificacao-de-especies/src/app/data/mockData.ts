// Mock data for spider identification based on dichotomous key
export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    description?: string;
    imageUrl?: string;
    nextQuestionId?: string;
    resultSpeciesId?: string;
  }[];
  category?: string;
}

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  description: string;
  habitat: string;
  characteristics: string[];
  imageUrl: string;
}

export const questionsData: Question[] = [
  {
    id: "c1",
    text: "Qual é o tipo de quelíceras do espécime?",
    category: "Morfologia das Quelíceras",
    options: [
      {
        id: "c1-paraxial",
        text: "Quelíceras Paraxiais",
        description: "Quelíceras que se movem paralelamente ao eixo do corpo (para cima e para baixo)",
        imageUrl: "https://images.unsplash.com/photo-1577802547337-ce3466a8bc5b?w=400&h=300&fit=crop",
        resultSpeciesId: "mygalomorphae"
      },
      {
        id: "c1-diaxial",
        text: "Quelíceras Diaxiais",
        description: "Quelíceras que se movem lateralmente (movimento de pinça)",
        imageUrl: "https://images.unsplash.com/photo-1598461812746-e93ca7f28639?w=400&h=300&fit=crop",
        nextQuestionId: "c2"
      }
    ]
  },
  {
    id: "c2",
    text: "Como estão dispostos os olhos do espécime?",
    category: "Disposição Ocular",
    options: [
      {
        id: "c2-separados",
        text: "Olhos Separados (ocupam metade ou mais da área cefálica)",
        description: "Olhos bem espaçados entre si, ocupando grande parte da região cefálica",
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop",
        nextQuestionId: "c3"
      },
      {
        id: "c2-agrupados",
        text: "6 ou Mais Olhos Agrupados",
        description: "Olhos próximos entre si, formando um grupo compacto",
        imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=300&fit=crop",
        nextQuestionId: "c4"
      }
    ]
  },
  {
    id: "c3",
    text: "Qual é a forma do sulco torácico?",
    category: "Morfologia do Cefalotórax",
    options: [
      {
        id: "c3-u",
        text: "Sulco Torácico em Forma de U",
        description: "Sulco no cefalotórax com formato de U invertido",
        imageUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
        resultSpeciesId: "actinopodidae"
      },
      {
        id: "c3-t",
        text: "Sulco Torácico em Forma de T",
        description: "Sulco no cefalotórax com formato de T",
        imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop",
        resultSpeciesId: "idiopidae-partial"
      }
    ]
  },
  {
    id: "c4",
    text: "Como são as fiandeiras laterais posteriores?",
    category: "Morfologia das Fiandeiras",
    options: [
      {
        id: "c4-longas",
        text: "Muito Longas e Separadas",
        description: "Fiandeiras laterais posteriores extremamente longas e visivelmente afastadas",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        resultSpeciesId: "dipluridae"
      },
      {
        id: "c4-curtas",
        text: "Curtas ou Moderadas",
        description: "Fiandeiras de tamanho normal, não excessivamente longas",
        imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
        nextQuestionId: "c5"
      }
    ]
  },
  {
    id: "c5",
    text: "O espécime possui tufos subungueais?",
    category: "Características das Patas",
    options: [
      {
        id: "c5-sim",
        text: "Possui Tufos Subungueais",
        description: "Presença de tufos de pelos sob as garras (unhas) das patas",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop",
        nextQuestionId: "c6"
      },
      {
        id: "c5-nao",
        text: "Não Possui Tufos Subungueais",
        description: "Ausência de tufos de pelos sob as garras",
        imageUrl: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=300&fit=crop",
        nextQuestionId: "c7"
      }
    ]
  },
  {
    id: "c6",
    text: "Como são os enditos (maxilas modificadas)?",
    category: "Morfologia dos Enditos",
    options: [
      {
        id: "c6-projetados",
        text: "Fortemente Projetados Anteriormente",
        description: "Enditos alongados e proeminentes, projetando-se para frente",
        imageUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop",
        resultSpeciesId: "theraphosidae"
      },
      {
        id: "c6-normais",
        text: "Não Projetados ou Levemente Projetados",
        description: "Enditos de formato normal, não excessivamente alongados",
        imageUrl: "https://images.unsplash.com/photo-1577802547337-ce3466a8bc5b?w=400&h=300&fit=crop",
        resultSpeciesId: "barychelidae"
      }
    ]
  },
  {
    id: "c7",
    text: "Posição dos olhos laterais anteriores:",
    category: "Disposição Ocular Detalhada",
    options: [
      {
        id: "c7-clipeo",
        text: "Próximos ao Clípeo",
        description: "Olhos laterais anteriores posicionados próximos à margem frontal (clípeo)",
        imageUrl: "https://images.unsplash.com/photo-1598461812746-e93ca7f28639?w=400&h=300&fit=crop",
        resultSpeciesId: "idiopidae-complete"
      },
      {
        id: "c7-afastados",
        text: "Afastados do Clípeo",
        description: "Olhos laterais anteriores distantes da margem frontal",
        imageUrl: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop",
        nextQuestionId: "c8"
      }
    ]
  },
  {
    id: "c8",
    text: "Características do corpo e enditos:",
    category: "Morfologia Corporal",
    options: [
      {
        id: "c8-particulas",
        text: "Enditos Projetados + Partículas de Solo Aderidas",
        description: "Corpo com partículas de solo grudadas e enditos projetados",
        imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400&h=300&fit=crop",
        resultSpeciesId: "paratropididae"
      },
      {
        id: "c8-limpo",
        text: "Corpo Limpo (sem partículas aderidas)",
        description: "Corpo sem partículas de solo visíveis",
        imageUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
        nextQuestionId: "c9"
      }
    ]
  },
  {
    id: "c9",
    text: "A tíbia III possui depressão dorsal?",
    category: "Morfologia das Pernas",
    options: [
      {
        id: "c9-sim",
        text: "Possui Depressão Dorsal na Tíbia III",
        description: "Presença de uma depressão (cavidade) na parte superior da tíbia da terceira perna",
        imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop",
        resultSpeciesId: "ctenizidae"
      },
      {
        id: "c9-nao",
        text: "Não Possui Depressão Dorsal",
        description: "Tíbia III sem depressão dorsal visível",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        nextQuestionId: "c10"
      }
    ]
  },
  {
    id: "c10",
    text: "Qual é o formato dos enditos?",
    category: "Formato dos Enditos",
    options: [
      {
        id: "c10-quadrados",
        text: "Quadrados (tão longos quanto largos)",
        description: "Enditos com proporções semelhantes em comprimento e largura",
        imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
        resultSpeciesId: "cyrtaucheniidae"
      },
      {
        id: "c10-retangulares",
        text: "Retangulares (mais longos que largos)",
        description: "Enditos visivelmente mais compridos do que largos",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop",
        nextQuestionId: "c11"
      }
    ]
  },
  {
    id: "c11",
    text: "Qual é o tamanho e características das fiandeiras?",
    category: "Tamanho Corporal",
    options: [
      {
        id: "c11-pequeno",
        text: "Muito Pequeno (< 3mm) com Fiandeiras Curtas",
        description: "Organismo extremamente pequeno com fiandeiras pouco desenvolvidas",
        imageUrl: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=300&fit=crop",
        resultSpeciesId: "microstigmatidae"
      },
      {
        id: "c11-normal",
        text: "Tamanho Normal (> 3mm)",
        description: "Organismo de tamanho convencional para aranhas migalomorfas",
        imageUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop",
        resultSpeciesId: "nemesiidae"
      }
    ]
  }
];

export const speciesData: Species[] = [
  {
    id: "mygalomorphae",
    commonName: "Infraordem Mygalomorphae",
    scientificName: "Mygalomorphae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Mygalomorphae",
    genus: "Diversos",
    species: "Infraordem",
    description: "As Mygalomorphae são aranhas primitivas caracterizadas por quelíceras paraxiais que se movem paralelamente ao eixo do corpo. Este grupo inclui as caranguejeiras e outras aranhas grandes. Possuem livros pulmonares duplos e são geralmente construídas de forma robusta.",
    habitat: "Distribuídas globalmente em regiões tropicais e subtropicais, habitam tocas no solo, sob pedras e troncos",
    characteristics: [
      "Quelíceras paraxiais (movimento vertical)",
      "Geralmente grandes e robustas",
      "Dois pares de livros pulmonares",
      "Longevas (podem viver décadas)",
      "Construtoras de tocas"
    ],
    imageUrl: "https://images.unsplash.com/photo-1577802547337-ce3466a8bc5b?w=800&h=600&fit=crop"
  },
  {
    id: "actinopodidae",
    commonName: "Família Actinopodidae",
    scientificName: "Actinopodidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Actinopodidae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas caracterizadas pelo sulco torácico em forma de U e olhos separados ocupando grande parte da área cefálica. São aranhas construtoras de tocas com comportamento fossorial.",
    habitat: "América do Sul, principalmente em regiões de solo arenoso e savanas",
    characteristics: [
      "Sulco torácico em forma de U",
      "Olhos bem separados",
      "Construtoras de tocas profundas",
      "Comportamento fossorial",
      "Quelíceras robustas"
    ],
    imageUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=600&fit=crop"
  },
  {
    id: "idiopidae-partial",
    commonName: "Família Idiopidae (Tipo 1)",
    scientificName: "Idiopidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Idiopidae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas identificadas pelo sulco torácico em forma de T. São construtoras de tocas com alçapões, apresentando comportamento críptico e predatório de emboscada.",
    habitat: "Distribuição principalmente em regiões temperadas e subtropicais",
    characteristics: [
      "Sulco torácico em forma de T",
      "Construtoras de tocas com alçapão",
      "Predadores de emboscada",
      "Carapaça geralmente lisa",
      "Comportamento críptico"
    ],
    imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop"
  },
  {
    id: "dipluridae",
    commonName: "Família Dipluridae",
    scientificName: "Dipluridae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Dipluridae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas facilmente identificáveis pelas fiandeiras laterais posteriores extremamente longas e separadas. Constroem teias em forma de funil em tocas e fendas.",
    habitat: "Regiões tropicais e subtropicais, principalmente em áreas úmidas de florestas",
    characteristics: [
      "Fiandeiras laterais posteriores muito longas",
      "Fiandeiras visivelmente separadas",
      "Construtoras de teias em funil",
      "Predadores noturnos",
      "Habitam tocas e fendas"
    ],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
  },
  {
    id: "theraphosidae",
    commonName: "Família Theraphosidae (Caranguejeiras)",
    scientificName: "Theraphosidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Theraphosidae",
    genus: "Diversos",
    species: "Família",
    description: "As famosas caranguejeiras são caracterizadas por enditos fortemente projetados anteriormente e presença de tufos subungueais. São as maiores aranhas do mundo e muito populares como pets exóticos.",
    habitat: "Distribuição cosmopolita em regiões tropicais e subtropicais, habitam tocas, árvores e bromélias",
    characteristics: [
      "Enditos fortemente projetados",
      "Tufos subungueais desenvolvidos",
      "Corpo robusto e peludo",
      "Tamanho grande (até 30cm envergadura)",
      "Longevas (fêmeas vivem até 30 anos)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=600&fit=crop"
  },
  {
    id: "barychelidae",
    commonName: "Família Barychelidae",
    scientificName: "Barychelidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Barychelidae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas com tufos subungueais mas enditos não fortemente projetados. São construtoras de tocas e se distinguem das Theraphosidae pela morfologia dos enditos.",
    habitat: "Regiões tropicais e subtropicais, principalmente no hemisfério sul",
    characteristics: [
      "Tufos subungueais presentes",
      "Enditos não projetados anteriormente",
      "Construtoras de tocas",
      "Tamanho médio a grande",
      "Comportamento fossorial"
    ],
    imageUrl: "https://images.unsplash.com/photo-1577802547337-ce3466a8bc5b?w=800&h=600&fit=crop"
  },
  {
    id: "idiopidae-complete",
    commonName: "Família Idiopidae (Tipo 2)",
    scientificName: "Idiopidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Idiopidae",
    genus: "Diversos",
    species: "Família",
    description: "Identificação completa de Idiopidae através dos olhos laterais anteriores próximos ao clípeo. Construtoras especializadas de tocas com alçapões sofisticados.",
    habitat: "Distribuídas em regiões temperadas e subtropicais, preferem solos que permitam escavação",
    characteristics: [
      "Olhos laterais anteriores próximos ao clípeo",
      "Sem tufos subungueais",
      "Alçapões sofisticados",
      "Camuflagem eficiente",
      "Predadores de emboscada especializados"
    ],
    imageUrl: "https://images.unsplash.com/photo-1598461812746-e93ca7f28639?w=800&h=600&fit=crop"
  },
  {
    id: "paratropididae",
    commonName: "Família Paratropididae",
    scientificName: "Paratropididae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Paratropididae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas únicas com enditos projetados e partículas de solo aderidas ao corpo. Esta característica de camuflagem as ajuda a se misturar com o ambiente.",
    habitat: "Regiões tropicais da América do Sul e Central",
    characteristics: [
      "Enditos projetados anteriormente",
      "Partículas de solo aderidas ao corpo",
      "Excelente camuflagem",
      "Construtoras de tocas",
      "Comportamento críptico"
    ],
    imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=600&fit=crop"
  },
  {
    id: "ctenizidae",
    commonName: "Família Ctenizidae",
    scientificName: "Ctenizidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Ctenizidae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas alçapão caracterizadas pela depressão dorsal na tíbia III. São excelentes construtoras de tocas com tampas perfeitamente ajustadas ao substrato.",
    habitat: "Distribuição global em regiões temperadas e tropicais",
    characteristics: [
      "Depressão dorsal na tíbia III",
      "Alçapões perfeitamente ajustados",
      "Pernas robustas para escavação",
      "Comportamento fossorial especializado",
      "Camuflagem excepcional"
    ],
    imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop"
  },
  {
    id: "cyrtaucheniidae",
    commonName: "Família Cyrtaucheniidae",
    scientificName: "Cyrtaucheniidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Cyrtaucheniidae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas identificadas pelos enditos quadrados (tão longos quanto largos). Constroem tocas tubulares forradas com seda.",
    habitat: "Distribuídas globalmente em regiões tropicais e temperadas quentes",
    characteristics: [
      "Enditos quadrados (comprimento = largura)",
      "Tocas tubulares forradas de seda",
      "Sem depressão na tíbia III",
      "Tamanho pequeno a médio",
      "Construtoras especializadas"
    ],
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop"
  },
  {
    id: "microstigmatidae",
    commonName: "Família Microstigmatidae",
    scientificName: "Microstigmatidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Microstigmatidae",
    genus: "Diversos",
    species: "Família",
    description: "As menores aranhas migalomorfas, com menos de 3mm de comprimento corporal e fiandeiras curtas. Vivem em serapilheira e são raramente observadas devido ao tamanho diminuto.",
    habitat: "América Central e do Sul, vivem em serapilheira de florestas úmidas",
    characteristics: [
      "Tamanho muito pequeno (< 3mm)",
      "Fiandeiras curtas",
      "Enditos retangulares",
      "Habitam serapilheira",
      "Raramente observadas"
    ],
    imageUrl: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&h=600&fit=crop"
  },
  {
    id: "nemesiidae",
    commonName: "Família Nemesiidae",
    scientificName: "Nemesiidae",
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Arachnida",
    order: "Araneae",
    family: "Nemesiidae",
    genus: "Diversos",
    species: "Família",
    description: "Aranhas migalomorfas de tamanho normal (maior que 3mm) com enditos retangulares. Constroem tocas simples forradas com seda e são encontradas em diversos habitats.",
    habitat: "Distribuição global, principalmente em regiões mediterrâneas e temperadas",
    characteristics: [
      "Tamanho normal para migalomorfas (> 3mm)",
      "Enditos retangulares",
      "Tocas simples forradas de seda",
      "Adaptadas a diversos habitats",
      "Comportamento fossorial"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=600&fit=crop"
  }
];
