// Tipos baseados nos modelos Flask

export interface Chave {
  id: number;
  texto: string;
  categoria: string;
}

export interface Especie {
  id: number;
  nomeComum: string;
  nomeCientifico: string;
  reino: string;
  filo: string;
  classe: string;
  ordem: string;
  familia: string;
  genero: string;
  especie: string;
  descricao: string;
  habitat: string;
  caracteristicas: string;
  imgURL: string;
}

export interface Opcao {
  id: number;
  texto: string;
  descricao: string;
  imgURL: string;
  id_chave: number;
  id_especie: number | null;
  id_proxima_chave: number | null;
}

export interface ChaveComOpcoes {
  id: number;
  texto: string;
  categoria: string;
  opcoes: Opcao[];
}

// Tipo para a resposta de início da identificação guiada
export interface InicioGuia {
  id: number;
  texto: string;
  categoria: string;
  opcoes: {
    id: number;
    texto: string;
    id_proxima_chave: number | null;
    id_especie: number | null;
  }[];
}
