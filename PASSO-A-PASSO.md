# Passo a Passo - Backend Eventos API

Guia completo para rodar a API localmente e acessar a documentação Swagger.

---

## 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.x ([download](https://nodejs.org/))
- **pnpm** >= 8.x (instalar com `npm install -g pnpm`)
- **Docker** (opcional, para rodar em container)

---

## 2. Instalação

### 2.1 Clone o repositório (se aplicável)

```bash
git clone <url-do-repositorio>
cd backend_eventos
```

### 2.2 Instale as dependências

```bash
pnpm install
```

### 2.3 Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite se necessário (porta padrão é 3000)
```

---

## 3. Executando a API

### Opção A: Modo Desenvolvimento (com hot-reload)

```bash
pnpm start:dev
```

### Opção B: Modo Produção

```bash
# Compile o projeto
pnpm build

# Execute
pnpm start:prod
```

### Opção C: Com Docker

```bash
# Build e run com Docker
pnpm docker:build
pnpm docker:run

# Ou com docker-compose
pnpm docker:prod
```

---

## 4. Acessando a API

Após iniciar a API, ela estará disponível em:

| Recurso | URL |
|---------|-----|
| **API Base** | http://localhost:3000 |
| **Swagger (Documentação)** | http://localhost:3000/api |
| **Health Check** | http://localhost:3000/health |

---

## 5. Usando o Swagger

### 5.1 Acesse a documentação

1. Abra o navegador
2. Vá para: **http://localhost:3000/api**

### 5.2 Testando os endpoints

Na interface do Swagger você pode:

1. **Expandir** cada endpoint clicando nele
2. Clicar em **"Try it out"**
3. Preencher os parâmetros necessários
4. Clicar em **"Execute"**
5. Ver a resposta abaixo

### 5.3 Exemplo: Criar um evento

1. Vá para `POST /events`
2. Clique em "Try it out"
3. Cole o JSON no body:

```json
{
  "name": "Meu Primeiro Evento",
  "description": "Descrição do evento",
  "location": "São Paulo, Brasil",
  "date": "2026-06-15T10:00:00.000Z",
  "capacity": 100
}
```

4. Clique em "Execute"
5. Copie o `id` retornado para usar nos outros endpoints

### 5.4 Exemplo: Listar todos os eventos

1. Vá para `GET /events`
2. Clique em "Try it out"
3. Clique em "Execute"

### 5.5 Exemplo: Buscar evento por ID

1. Vá para `GET /events/{id}`
2. Clique em "Try it out"
3. Cole o ID do evento
4. Clique em "Execute"

---

## 6. Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Hello World |
| `GET` | `/health` | Status da API |
| `POST` | `/events` | Criar novo evento |
| `GET` | `/events` | Listar todos os eventos |
| `GET` | `/events/:id` | Buscar evento por ID |
| `PUT` | `/events/:id` | Atualizar evento (completo) |
| `PATCH` | `/events/:id` | Atualizar evento (parcial) |
| `DELETE` | `/events/:id` | Remover evento |

---

## 7. Testando com cURL

### Criar evento

```bash
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference",
    "description": "Conferência de tecnologia",
    "location": "São Paulo",
    "date": "2026-06-15T10:00:00.000Z",
    "capacity": 500
  }'
```

### Listar eventos

```bash
curl http://localhost:3000/events
```

### Buscar evento por ID

```bash
curl http://localhost:3000/events/<ID_DO_EVENTO>
```

### Atualizar evento

```bash
curl -X PATCH http://localhost:3000/events/<ID_DO_EVENTO> \
  -H "Content-Type: application/json" \
  -d '{"name": "Novo Nome"}'
```

### Deletar evento

```bash
curl -X DELETE http://localhost:3000/events/<ID_DO_EVENTO>
```

---

## 8. Executando Testes

```bash
# Testes unitários
pnpm test

# Testes com watch mode
pnpm test:watch

# Testes com cobertura
pnpm test:cov

# Testes e2e
pnpm test:e2e
```

---

## 9. Deploy na Vercel

### 9.1 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- CLI da Vercel instalada: `npm i -g vercel`

### 9.2 Deploy

```bash
# Login na Vercel
vercel login

# Build do projeto
pnpm build

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 9.3 Via GitHub

1. Faça push do código para o GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe o repositório
4. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
5. Clique em "Deploy"

---

## 10. Deploy com Docker

### 10.1 Build da imagem

```bash
docker build -t backend-eventos .
```

### 10.2 Executar container

```bash
docker run -p 3000:3000 -e PORT=3000 backend-eventos
```

### 10.3 Com Docker Compose

```bash
# Produção
docker-compose up -d api

# Desenvolvimento (com hot-reload)
docker-compose --profile dev up api-dev
```

---

## 11. Estrutura do Projeto

```
backend_eventos/
├── src/
│   ├── common/           # Filtros, guards, interceptors
│   ├── config/           # Configurações
│   ├── modules/
│   │   └── events/       # Módulo de eventos
│   │       ├── dto/      # Data Transfer Objects
│   │       ├── entities/ # Entidades
│   │       └── ...       # Controller, Service, Module
│   ├── app.module.ts
│   └── main.ts
├── test/                 # Testes e2e
├── Dockerfile
├── docker-compose.yml
├── vercel.json
└── package.json
```

---

## 12. Troubleshooting

### Porta já em uso

```bash
# Mude a porta no .env
PORT=3001
```

### Erro de dependências

```bash
# Limpe e reinstale
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Docker não inicia

```bash
# Verifique se o Docker está rodando
docker info

# Reconstrua a imagem
docker-compose build --no-cache
```

---

## Links Úteis

- **Swagger UI**: http://localhost:3000/api
- **NestJS Docs**: https://docs.nestjs.com
- **Swagger Docs**: https://swagger.io/docs

---

Pronto! Agora você pode explorar a API usando o Swagger em http://localhost:3000/api
