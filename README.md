# Backend Eventos

API RESTful para gerenciamento de eventos desenvolvida com NestJS.

## Tecnologias

- **NestJS** v11.x - Framework Node.js progressivo
- **TypeScript** v5.9.x - Superset tipado de JavaScript
- **Jest** v30.x - Framework de testes
- **Swagger** - Documentação automática da API
- **class-validator** - Validação de DTOs
- **class-transformer** - Transformação de objetos

## Requisitos

- Node.js >= 18.x
- pnpm >= 8.x

## Instalação

```bash
# Instalar dependências
pnpm install

# Copiar arquivo de ambiente
cp .env.example .env
```

## Executando a Aplicação

```bash
# Desenvolvimento
pnpm start:dev

# Produção
pnpm build
pnpm start:prod

# Debug
pnpm start:debug
```

A aplicação estará disponível em `http://localhost:3000`

## Documentação da API

Após iniciar a aplicação, acesse a documentação Swagger em:

```
http://localhost:3000/api
```

## Endpoints

### Health Check

| Método | Endpoint  | Descrição          |
|--------|-----------|-------------------|
| GET    | /         | Hello World       |
| GET    | /health   | Status da API     |

### Eventos

| Método | Endpoint      | Descrição                    |
|--------|---------------|------------------------------|
| POST   | /events       | Criar novo evento            |
| GET    | /events       | Listar todos os eventos      |
| GET    | /events/:id   | Buscar evento por ID         |
| PUT    | /events/:id   | Atualizar evento (completo)  |
| PATCH  | /events/:id   | Atualizar evento (parcial)   |
| DELETE | /events/:id   | Remover evento               |

## Testes

```bash
# Testes unitários
pnpm test

# Testes com watch mode
pnpm test:watch

# Cobertura de testes
pnpm test:cov

# Testes e2e
pnpm test:e2e
```

## Lint e Formatação

```bash
# Executar ESLint
pnpm lint

# Formatar código com Prettier
pnpm format
```

## Estrutura do Projeto

```
src/
├── common/
│   ├── constants/       # Constantes globais
│   ├── decorators/      # Decorators customizados
│   ├── filters/         # Exception filters
│   ├── guards/          # Guards de autenticação/autorização
│   ├── interceptors/    # Interceptors
│   ├── interfaces/      # Interfaces globais
│   └── pipes/           # Pipes de validação
├── config/              # Configurações da aplicação
├── database/            # Configurações de banco de dados
├── modules/
│   └── events/
│       ├── dto/         # Data Transfer Objects
│       ├── entities/    # Entidades
│       ├── events.controller.ts
│       ├── events.module.ts
│       └── events.service.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
test/
├── app.e2e-spec.ts
├── events.e2e-spec.ts
└── jest-e2e.json
```

## Deploy

### Variáveis de Ambiente

| Variável | Descrição            | Padrão      |
|----------|---------------------|-------------|
| PORT     | Porta do servidor   | 3000        |
| NODE_ENV | Ambiente            | development |

### Docker

O projeto inclui configuração completa de Docker.

```bash
# Build da imagem
pnpm docker:build

# Executar em produção
pnpm docker:run

# Ou com docker-compose
pnpm docker:prod

# Desenvolvimento com hot-reload
pnpm docker:dev
```

### Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Build do projeto
pnpm build

# Deploy
vercel --prod
```

Ou conecte seu repositório GitHub diretamente na Vercel:
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório
3. Configure Build Command: `pnpm build`
4. Configure Output Directory: `dist`
5. Deploy!

### Plataformas de Hospedagem

Esta aplicação está pronta para deploy em:

- **Vercel** (configuração inclusa)
- **Railway**
- **Render**
- **Heroku**
- **AWS (ECS, Elastic Beanstalk)**
- **Google Cloud Run**
- **Azure App Service**

## Guia Completo

Veja o arquivo [PASSO-A-PASSO.md](./PASSO-A-PASSO.md) para um guia detalhado de como rodar a API e usar o Swagger.

## Licença

UNLICENSED
