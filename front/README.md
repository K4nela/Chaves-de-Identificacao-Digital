# GuessKeys - Sistema de Identificação de Aranhas Migalomorfas

Sistema web completo para identificação de aranhas migalomorfas através de chaves dicotômicas guiadas e busca por filtros taxonômicos.

## Stack Tecnológica

### Frontend
- **React 18.3** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **React Router 7** - Roteamento
- **Vite** - Build tool
- **Motion (Framer Motion)** - Animações
- **Material UI** - Componentes UI adicionais
- **Radix UI** - Componentes UI primitivos

### Backend
- **Flask** - Framework Python
- **SQLite** - Banco de dados
- **SQLAlchemy** - ORM

## Configuração do Projeto

### Pré-requisitos

- Node.js 18+ e pnpm
- Python 3.8+
- Backend Flask configurado e rodando

### Instalação do Frontend

1. Clone o repositório e instale as dependências:

```bash
pnpm install
```

2. Configure a URL da API Flask no arquivo `.env`:

```bash
VITE_API_URL=http://localhost:5000
```

3. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/           # Componentes base (shadcn/ui)
│   │   ├── Header.tsx    # Cabeçalho da aplicação
│   │   ├── Footer.tsx    # Rodapé
│   │   └── Layout.tsx    # Layout principal
│   ├── pages/            # Páginas da aplicação
│   │   ├── HomePage.tsx              # Página inicial
│   │   ├── GuidedIdentification.tsx  # Identificação guiada
│   │   ├── FilterSearch.tsx          # Busca por filtros
│   │   ├── SpeciesResult.tsx         # Resultado da identificação
│   │   ├── AdminDashboard.tsx        # Painel administrativo
│   │   ├── Login.tsx                 # Login do admin
│   │   └── ProtectedAdmin.tsx        # Proteção de rotas admin
│   ├── services/         # Serviços de API
│   │   └── api.ts        # Chamadas à API Flask
│   ├── types/            # Tipos TypeScript
│   │   └── api.ts        # Tipos dos modelos da API
│   ├── data/             # Dados mockados (deprecated)
│   │   └── mockData.ts
│   ├── routes.tsx        # Configuração de rotas
│   └── App.tsx          # Componente raiz
├── styles/              # Estilos globais
│   ├── fonts.css        # Importação de fontes
│   └── theme.css        # Tema Tailwind customizado
└── imports/             # Componentes importados do Figma
```

## Endpoints da API Flask Necessários

### Já Implementados no Backend

✅ `GET /chaves` - Lista todas as chaves  
✅ `GET /guia/comecar` - Inicia a identificação guiada  
✅ `GET /guia/<int:id>` - Retorna uma chave específica com opções  
✅ `GET /api/especies` - Lista todas as espécies  
✅ `GET /api/especies/<int:id>` - Retorna uma espécie específica

### Endpoints Adicionais Necessários (CRUD Completo)

Para o painel administrativo funcionar completamente, você precisa implementar:

#### Chaves
```python
POST   /api/chaves           # Criar nova chave
PUT    /api/chaves/<int:id>  # Atualizar chave existente
DELETE /api/chaves/<int:id>  # Deletar chave
```

#### Espécies
```python
POST   /api/especies           # Criar nova espécie
PUT    /api/especies/<int:id>  # Atualizar espécie existente
DELETE /api/especies/<int:id>  # Deletar espécie
```

#### Opções
```python
GET    /api/opcoes                # Listar todas as opções
POST   /api/opcoes                # Criar nova opção
PUT    /api/opcoes/<int:id>       # Atualizar opção existente
DELETE /api/opcoes/<int:id>       # Deletar opção
GET    /api/opcoes/chave/<int:id> # Listar opções de uma chave
```

### Exemplo de Implementação dos Endpoints CRUD

Adicione ao seu arquivo de rotas Flask:

```python
# /routes/Especies.py
from flask import Blueprint, jsonify, request
from ..models.Especies import Especies
from ..database.database import db

especies_bp = Blueprint("species", __name__)

@especies_bp.route("/api/especies", methods=["POST"])
def create_especie():
    data = request.json
    nova_especie = Especies(
        nomeComum=data['nomeComum'],
        nomeCientifico=data['nomeCientifico'],
        reino=data['reino'],
        filo=data['filo'],
        classe=data['classe'],
        ordem=data['ordem'],
        familia=data['familia'],
        genero=data['genero'],
        especie=data['especie'],
        descricao=data['descricao'],
        habitat=data['habitat'],
        caracteristicas=data['caracteristicas'],
        imgURL=data['imgURL']
    )
    db.session.add(nova_especie)
    db.session.commit()
    return jsonify(nova_especie.to_dict()), 201

@especies_bp.route("/api/especies/<int:id>", methods=["PUT"])
def update_especie(id):
    especie = Especies.query.get_or_404(id)
    data = request.json
    
    for key, value in data.items():
        if hasattr(especie, key):
            setattr(especie, key, value)
    
    db.session.commit()
    return jsonify(especie.to_dict())

@especies_bp.route("/api/especies/<int:id>", methods=["DELETE"])
def delete_especie(id):
    especie = Especies.query.get_or_404(id)
    db.session.delete(especie)
    db.session.commit()
    return '', 204
```

## Funcionalidades

### 1. Identificação Guiada
- Seleção obrigatória de classe taxonômica
- Navegação por chaves dicotômicas
- Histórico de escolhas navegável
- Barra de progresso
- Resultado detalhado com classificação completa

### 2. Busca por Filtros
- Filtros por níveis taxonômicos (Reino, Filo, Classe, Ordem, Família, Gênero)
- Validação de filtros obrigatórios
- Resultados dinâmicos

### 3. Painel Administrativo
- Login protegido (usuário: `admin`, senha: `admin123`)
- CRUD completo de espécies
- Visualização de chaves
- Interface intuitiva com tabs

### 4. Página de Resultados
- Classificação taxonômica completa
- Imagens ilustrativas
- Descrição detalhada
- Habitat e características
- Histórico da identificação (quando vindo da identificação guiada)

## Credenciais de Admin

- **Usuário:** `admin`
- **Senha:** `admin123`

## Estrutura de Dados

### Modelo Chaves
```typescript
interface Chave {
  id: number;
  texto: string;
  categoria: string;
}
```

### Modelo Espécies
```typescript
interface Especie {
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
  caracteristicas: string; // String separada por vírgulas
  imgURL: string;
}
```

### Modelo Opções
```typescript
interface Opcao {
  id: number;
  texto: string;
  descricao: string;
  imgURL: string;
  id_chave: number;
  id_especie: number | null;
  id_proxima_chave: number | null;
}
```

## CORS

Certifique-se de que o backend Flask está configurado com CORS habilitado:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
```

## Design System

### Cores
- **Verde principal:** `#798e3f`
- **Verde hover:** `#748f27`
- **Fundo:** Gradiente de branco para `#f8faf5`

### Fontes
- **Títulos:** Jeju Hallasan (importada do Google Fonts)
- **Corpo:** Jaldi (importada do Google Fonts)

## Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria build de produção
- `pnpm preview` - Preview do build de produção

## Observações Importantes

1. **Características das Espécies**: No banco de dados, o campo `caracteristicas` é uma string. No frontend, ela é convertida em array usando `split(',').map(c => c.trim())`.

2. **IDs**: Todos os IDs são numéricos no backend Flask, diferente do mockData que usava strings.

3. **Imagens**: As URLs das imagens devem ser completas e acessíveis (pode usar Unsplash, armazenamento próprio, etc.).

4. **Estado de Carregamento**: Todas as páginas têm estados de loading apropriados enquanto os dados são carregados da API.

## Próximos Passos

1. Implementar os endpoints CRUD faltantes no backend Flask
2. Adicionar autenticação JWT para o painel administrativo
3. Implementar upload de imagens
4. Adicionar paginação para listas grandes
5. Implementar busca por texto em espécies
6. Adicionar testes unitários e de integração

## Suporte

Para problemas ou dúvidas, consulte a documentação do Flask e do React, ou abra uma issue no repositório do projeto.
