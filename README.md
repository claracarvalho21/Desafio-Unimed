# Sistema de Agenda de Contatos

## Descrição

Sistema de Agenda de Contatos desenvolvido como desafio técnico, permitindo cadastrar, listar, editar, favoritar e inativar contatos.

O projeto foi desenvolvido utilizando **React + TypeScript** no frontend e **Node.js + Express + TypeScript** no backend, seguindo boas práticas de arquitetura, separação de responsabilidades e organização em camadas.

---

# Tecnologias utilizadas

## Frontend

* React
* TypeScript
* Vite
* React Router
* React Query
* Context API
* Axios
* Tailwind CSS
* Atomic Design

## Backend

* Node.js
* Express
* TypeScript
* TypeORM
* PostgreSQL
* Zod
* JWT
* CORS
* Dotenv

## Infraestrutura

* Docker
* Docker Compose
* PostgreSQL
* pgAdmin

---

# Arquitetura

## Frontend

Organizado utilizando Atomic Design:

```
Pages
 ├── Templates
 │     ├── Organisms
 │     │      ├── Molecules
 │     │      │      └── Atoms
 │
 ├── Hooks
 ├── Services
 ├── API
 └── Utils
```

Fluxo da aplicação:

---

## Backend

O backend foi desenvolvido utilizando arquitetura Clean Architecture, aplicando conceitos do Domain-Driven Design (DDD) para promover baixo acoplamento, separação de responsabilidades e facilidade de manutenção.

```
Cada camada possui uma responsabilidade específica:

* **Routes:** definição dos endpoints.
* **Controllers:** recebem as requisições HTTP.
* **Use Cases:** concentram as regras de negócio.
* **Repositories:** realizam o acesso ao banco.
* **Entities:** representam o modelo da aplicação e o mapeamento do banco.
* **Mappers:** convertem entidades para objetos de resposta.
---
# Banco de Dados

O banco de dados utilizado é o **PostgreSQL**, executado através do Docker.

O acesso ao banco é realizado utilizando o **TypeORM**, responsável pelo mapeamento objeto-relacional (ORM).

O projeto utiliza **Migrations**, permitindo versionar toda a estrutura do banco de dados de forma segura e controlada.

**Fluxo do banco:**

```
---

# Docker

A aplicação utiliza Docker para disponibilizar um ambiente padronizado.

Os serviços configurados são:

* PostgreSQL
* pgAdmin
* Backend

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/claracarvalho21/Desafio-Unimed.git
```

---

## 2. Executar Backend + Banco de Dados

Na pasta onde está localizado o arquivo `docker-compose.yml`:

```bash
docker-compose up --build
```

Serão iniciados automaticamente:

| Serviço    | Porta |
| ---------- | ----: |
| PostgreSQL |  5432 |
| pgAdmin    |  5050 |
| Backend    |  4100 |

O pgAdmin poderá ser acessado em:

```
http://localhost:5050
```

---

## 3. Executar o Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Funcionalidades

* Cadastro de contatos
* Listagem de contatos
* Busca por nome
* Atualização de contatos
* Favoritar contato
* Inativar contato
* Reativar contato
* Listagem de favoritos
* Validação de dados no frontend e backend

---

# Conceitos aplicados

* Clean Architecture
* Atomic Design
* Repository Pattern
* DTO
* Mapper
* React Query
* Context API
* Custom Hooks
* Services Layer
* TypeORM
* Migrations
* Docker
* PostgreSQL
* Tratamento de erros com try/catch
* Validação de entrada
* Variáveis de ambiente (.env)

---

# Protótipo

Protótipo desenvolvido no Figma:

**Link:**  https://www.figma.com/design/XhJmHt5NW3R92ye4WmdEb5/Untitled?node-id=0-1&t=lVE2BQW4owmpeDTZ-1

---

# Desenvolvido por

**Clara Carvalho**
