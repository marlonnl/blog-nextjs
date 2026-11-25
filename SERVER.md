# Server

Comandos para inicializar o site do zero

## Instalar os pacotes do npm

```sh
npm i
```

## Configurar o .env.local

A partir do arquivo .env.local-EXAMPLE configurar o seu próprio, alterando as
hashes de senhas de acordo com as instruções em .env.local-EXAMPLE.

## Realizar a migração do banco de dados

```sh
npm run migrate
```

## Popular sua base de dados com postagens padrão [OPCIONAL]

Este passo serve apenas para visualização do site com postagens de exemplo. Não
é necessário realizar este passo para rodar o blog.

```sh
npm run seed
```

## Fazer o build do Next

```sh
npm run build
```
