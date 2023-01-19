# Gerenciador de Recebedores

É um prazer apresentar esta API de Gerenciamento de Recebedores.

## Tecnologias adotadas

- Koa (por ter uma performance melhor que Express e Hapi)
- Prisma (uma evolução do TypeORM)
- Jest (tanto para testes unitários como de integração)
- Docker e docker-compose

## Padrões de projeto utilizados

- SOLID
- MVC
- UUIDs
- Estrutura de pastas: package by feature
- Nunca utilizar exclusão física (apenas exclusão lógica)
- Testes unitários e de integração
- Foi prezado pelo uso de bibliotecas de alta performance e que mantém o código mais próximo do TypeScript puro

## Requisitos

- node v16
- postgresql v15.1
- docker e docker-compose

## Comandos

Comando | Funcionalidade
--------|----------------
npm install | instalar dependências
npm run dev | rodar em modo dev (porta 3000)
npm run lint | rodar o linter
npm run build | compila o projeto em dist/
npm run start | roda o projeto compilado em dist/ (porta 3000)
npm run migrate:generate | toda vez que alterar o modelo do banco de dados rodar este comando para atualizar o schema das tabelas
npm run migrate:apply | sobe o schema do banco de dados
npm run db:populate | popula o banco de dados com 30 recebedores
npm run test:unit | roda testes unitários
npm run test:integration | roda testes de integração (sobe banco de dados no docker)
npm run docker:build | monta a imagem docker (app + postgres)
npm run docker:up | roda a imagem docker
npm run docker:down | para a imagem docker

## Cenários de uso

Assumindo que você já tenha criado um banco de dados no postgresql e vai rodar o projeto pela primeira vez:

### Modo Dev

```
npm install
npm run migrate:apply
npm run db:populate
npm run dev
```

### Modo produção

```
npm install
npm run migrate:apply
npm run db:populate
npm run build
npm run start
```

### Modo produção *(Docker)*

```
npm run docker:build
npm run docker:up
```

### Testes

```
npm run test:unit
npm run test:integration
```

## Endpoints

### Buscar recebedores paginados

`GET /recipients`

queryParameter | valores possíveis
---------------|----------
name            | string
status          | [RASCUNHO, VALIDADO]
pixKey          | string
pixKeyType      | [CPF, CNPJ, TELEFONE, EMAIL ou CHAVE_ALEATORIA]
page            | number (**obrigatório**)

### Buscar recebedor por uuid

`GET /recipients/:id`

pathParam | valores possíveis
----------|------------------
:id       | uuid

### Cadastrar recebedor

`POST /recipients`

| body (exemplo)                        |
|---------------------------------------|
| {                                     |
|      name: 'Marycleidison José'       |
|      federalId: "48.686.965/0001-06", |
|      pixKey: "893.512.450-80",        |
|      pixKeyType: "CPF",               |
|      email: "example@email.com"       |
| }                                     |


### Alterar recebedor

`PUT /recipients/:id`

pathParam | valores possíveis
----------|------------------
:id       | uuid

| body (exemplo)                        |
|---------------------------------------|
| {                                     |
|      name: 'Marycleidison José'       |
|      federalId: "48.686.965/0001-06", |
|      pixKey: "893.512.450-80",        |
|      pixKeyType: "CPF",               |
|      email: "example@email.com"       |
| }                                     |

### Excluir recebedor

`DEL /recipients/:id`

pathParam | valores possíveis
----------|------------------
:id       | uuid

### Excluir recebedores em lote

`POST /recipients/batch-delete`

| body (exemplo)                        |
|---------------------------------------|
| {                                     |
|      ids: [                           |
|          'f9126dbf-3ab9-4fd7-b334-5e1d015a79d7', |
|          'adc9da31-0c60-40c7-84db-1ebe648a182d', |
|          '4c5f503b-678d-4cdf-b150-0219d5a2fe01'  |
|      ]                                |
| }                                     |

## API para testes

Disponibilizei uma API de exemplo em `3.86.12.16:3000` para testes:

```
curl "3.86.12.16:3000/recipients?page=1" -H "Accept: application/json"
```