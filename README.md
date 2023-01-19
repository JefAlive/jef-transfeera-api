# Gerenciador de Recebedores

Alguma descrição legal aqui

## Tecnologias adotadas

- Koa (por ter uma performance melhor que Express e Hapi)
- Prisma (uma evolução do TypeORM)
- ...

## Padrões de projeto utilizados

- SOLID
- MVC
- Estrutura de pastas: package by feature
- Nunca utilizar exclusão física (apenas exclusão lógica)
- Código mais próximo do TypeScript puro, sem muitas anotações (que é o que aconteceria no caso do Nest)
- Testes unitários e de integração

## Requisitos

- Node v16.x.x
- postgresql 15.1
- Docker e docker-compose

## Comandos

Comando | Funcionalidade
--------|----------------
npm install | instalar dependências
npm run dev | rodar em modo dev
npm run lint | rodar o linter
npm run build | compila o projeto em dist/
npm run start | roda o projeto compilado em dist/
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