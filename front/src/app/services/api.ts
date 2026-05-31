// Serviço de API para consumir o backend Flask
import type { Chave, Especie, ChaveComOpcoes, InicioGuia } from "../types/api";

// URL base da API - pode ser configurada via variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// Função auxiliar para fazer requisições
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      // Tentar pegar a mensagem de erro do backend
      let errorMessage = `${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.erro) {
          errorMessage = errorData.erro;
        }
      } catch (e) {
        // Se não conseguir parsear JSON, manter mensagem padrão
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// ============= CHAVES =============

export async function getChaves(): Promise<Chave[]> {
  return fetchAPI<Chave[]>("/chaves");
}

export async function iniciarGuia(): Promise<InicioGuia> {
  const dados = await fetchAPI<any>("/guia/comecar");
  // Mapear campos do backend (inglês) para frontend (português)
  return {
    id: dados.id,
    texto: dados.text || dados.texto,
    categoria: dados.category || dados.categoria,
    opcoes: dados.opcoes
  };
}

export async function getChave(id: number): Promise<ChaveComOpcoes> {
  const dados = await fetchAPI<any>(`/guia/${id}`);
  // Mapear campos do backend (inglês) para frontend (português)
  return {
    id: dados.id,
    texto: dados.text || dados.texto,
    categoria: dados.category || dados.categoria,
    opcoes: dados.opcoes
  };
}

// ============= ESPECIES =============

export async function getEspecies(): Promise<Especie[]> {
  return fetchAPI<Especie[]>("/especies");
}

export async function getEspecie(id: number): Promise<Especie> {
  return fetchAPI<Especie>(`/especies/${id}`);
}

// ============= ADMIN - CRUD OPERATIONS =============
// Estas rotas precisarão ser implementadas no backend Flask
export async function createChave(dados: any): Promise<Chave> {
  return fetchAPI<Chave>("/criar/chaves", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export async function updateChave(id: number, chave: Partial<Chave>): Promise<Chave> {
  return fetchAPI<Chave>(`/criar/chaves/${id}`, {
    method: "PUT",
    body: JSON.stringify(chave),
  });
}

export async function deleteChave(id: number): Promise<void> {
  return fetchAPI<void>(`/chaves/${id}`, {
    method: "DELETE",
  });
}

export async function createEspecie(especie: Omit<Especie, "id">): Promise<Especie> {
  return fetchAPI<Especie>("/criar/especies", {
    method: "POST",
    body: JSON.stringify(especie),
  });
}

export async function updateEspecie(id: number, especie: Partial<Especie>): Promise<Especie> {
  return fetchAPI<Especie>(`/criar/especies/${id}`, {
    method: "PUT",
    body: JSON.stringify(especie),
  });
}

export async function deleteEspecie(id: number): Promise<void> {
  return fetchAPI<void>(`/especies/${id}`, {
    method: "DELETE",
  });
}

// ============= OPCOES =============

export async function createOpcao(opcao: Omit<Opcao, "id">): Promise<Opcao> {
  return fetchAPI<Opcao>("/criar/opcoes", {
    method: "POST",
    body: JSON.stringify(opcao),
  });
}

export async function updateOpcao(id: number, opcao: Partial<Opcao>): Promise<Opcao> {
  return fetchAPI<Opcao>(`/criar/opcoes/${id}`, {
    method: "PUT",
    body: JSON.stringify(opcao),
  });
}

export async function deleteOpcao(id: number): Promise<void> {
  return fetchAPI<void>(`/criar/opcoes/${id}`, {
    method: "DELETE",
  });
}

interface Opcao {
  id: number;
  texto: string;
  descricao: string;
  imgURL: string;
  id_chave: number;
  id_especie: number | null;
  id_proxima_chave: number | null;
}

// ============= AUTENTICAÇÃO =============

export async function login(nomeUsuario: string, senha: string): Promise<{ mensagem: string; usuario: any }> {
  return fetchAPI<{ mensagem: string; usuario: any }>("/login", {
    method: "POST",
    body: JSON.stringify({ nomeUsuario, senha }),
  });
}
