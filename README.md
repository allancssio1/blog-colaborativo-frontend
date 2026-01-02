# Blog Frontend - React + TypeScript + Vite

Aplicação frontend de blog desenvolvida com React 19, TypeScript e Vite. Interface moderna e responsiva para criação, visualização e gerenciamento de postagens.

## Tecnologias Principais

- **React 19.2.0** - Biblioteca para construção de interfaces
- **TypeScript 5.7.3** - Superset JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool e dev server otimizado
- **React Router 7.11.0** - Roteamento client-side
- **Tailwind CSS 4** - Framework CSS utilitário
- **Axios 1.7.9** - Cliente HTTP
- **Radix UI** - Componentes acessíveis headless
- **Lucide React** - Biblioteca de ícones

## Pré-requisitos

- Node.js 18+ ou superior
- npm ou yarn
- Backend da aplicação rodando em `http://localhost:8000`

## Instalação

```bash
# Instalar dependências
npm install
```

## Configuração

A aplicação se conecta ao backend via Axios configurado em [src/services/api.ts](src/services/api.ts). Por padrão, a URL base é `http://localhost:8000`.

Para alterar a URL do backend, modifique a variável `baseURL` em [src/services/api.ts](src/services/api.ts):

```typescript
const api = axios.create({
  baseURL: 'http://localhost:8000', // Altere aqui se necessário
});
```

## Executando a Aplicação

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

### Linting

```bash
npm run lint
```

## Estrutura de Rotas

### Rotas Públicas

- **`/`** - Rota raiz
  - Redireciona para `/posts` se autenticado
  - Redireciona para `/login` se não autenticado

- **`/posts`** - Listagem de postagens
  - Exibe todas as postagens em grid de 3 colunas
  - Paginação com 12 posts por página
  - Acessível para usuários autenticados e visitantes

- **`/posts/:id`** - Visualização de postagem
  - Exibe título, conteúdo completo, autor e data
  - Botões de editar/deletar visíveis apenas para o autor
  - Acessível para usuários autenticados e visitantes

### Rotas de Autenticação (Guest Only)

- **`/login`** - Página de login
  - Formulário de autenticação (email + senha)
  - Redireciona para `/posts` após login bem-sucedido
  - Acessível apenas para usuários NÃO autenticados

- **`/register`** - Página de cadastro
  - Formulário de registro (nome, email, senha, confirmação)
  - Auto-login após registro bem-sucedido
  - Acessível apenas para usuários NÃO autenticados

### Rotas Protegidas (Requer Autenticação)

- **`/create-post`** - Criação de postagem
  - Formulário para criar nova postagem (título + conteúdo)
  - Requer autenticação
  - Redireciona para `/login` se não autenticado

- **`/edit-post/:id`** - Edição de postagem
  - Formulário para editar postagem existente
  - Requer autenticação
  - Apenas o autor pode editar sua própria postagem
  - Redireciona para `/login` se não autenticado

### Página de Erro

- **`/404`** - Página não encontrada
  - Exibida quando a rota não existe
  - Botão para retornar à página inicial

## Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Auth/         # Componentes de autenticação
│   ├── Common/       # Componentes comuns (Loading, Error, etc.)
│   ├── Layout/       # Componentes de layout
│   ├── Posts/        # Componentes relacionados a posts
│   └── ui/           # Componentes UI do Radix/shadcn
├── context/          # Contextos React (AuthContext)
├── hooks/            # Custom hooks (useAuth, usePosts)
├── pages/            # Páginas da aplicação
├── services/         # Serviços de API
├── types/            # Definições de tipos TypeScript
└── App.tsx           # Componente raiz com roteamento
```

## Autenticação

A aplicação utiliza autenticação via Bearer Token:

- Token JWT armazenado em `localStorage`
- Interceptor Axios adiciona automaticamente o token em requisições
- Interceptor trata respostas 401 (não autorizado) fazendo logout automático
- Context API gerencia estado de autenticação global
- Rotas protegidas via `<ProtectedRoute>` component
- Rotas guest-only via `<GuestRoute>` component

## Funcionalidades

### Gestão de Posts
- ✅ Listagem com paginação (12 posts por página)
- ✅ Visualização detalhada de post
- ✅ Criação de novo post (autenticado)
- ✅ Edição de post (apenas autor)
- ✅ Exclusão de post com confirmação (apenas autor)

### Autenticação
- ✅ Login com email e senha
- ✅ Registro de novo usuário
- ✅ Logout
- ✅ Proteção de rotas

### UX
- ✅ Loading states granulares (fetching, creating, updating, deleting)
- ✅ Tratamento de erros com mensagens amigáveis
- ✅ Toasts para feedback de ações
- ✅ Interface responsiva (mobile-first)
- ✅ Smooth scroll em navegação de página

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build otimizado para produção |
| `npm run preview` | Visualiza build de produção localmente |
| `npm run lint` | Executa ESLint para verificar código |

## Variáveis de Ambiente

A aplicação não utiliza variáveis de ambiente via `.env`. A configuração do backend está hardcoded em [src/services/api.ts](src/services/api.ts).

Se desejar usar variáveis de ambiente:

1. Crie arquivo `.env` na raiz do frontend:
```env
VITE_API_URL=http://localhost:8000
```

2. Atualize [src/services/api.ts](src/services/api.ts):
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});
```

## Troubleshooting

### Erro de conexão com backend
- Verifique se o backend está rodando em `http://localhost:8000`
- Confirme que não há erros de CORS no console do navegador

### Token inválido após restart
- Limpe o `localStorage` do navegador
- Faça login novamente

### Rotas protegidas não funcionam
- Verifique se o token está presente em `localStorage` (chave: `token`)
- Confirme que o backend está validando o token corretamente

## Licença

Este projeto faz parte de um desafio técnico.
