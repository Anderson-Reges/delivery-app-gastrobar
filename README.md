# Delivery app é projeto que implementa um app delivery de bebidas, desenvolvido durante meus estudos na [Trybe](https://www.betrybe.com/)

## 👨‍💻 O que foi ser desenvolvido

Este projeto é uma aplicação de delivery que permite o cliente comprar e fazer um pedido a um vendendor cadastrado no banco do app, o vendendor no caso pode gerenciar os status dos pedidos a qual pertence a ele, no total são quatro status: "Pendente" - "Preparando" - "Em Trânsito" - "Entregue". o app tambem permite um gerenciamente de usuarios pelo o login do administrador assim como cadastra outros os usuarios tambem.

## Técnologias usadas

> Back-end

<a href="https://nodejs.org/en/" target="_blank">![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" target="_blank">![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)</a>
<a href="https://jwt.io/" target="_blank">![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)</a>
<a href="https://www.mysql.com/" target="_blank">![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)</a>

> Front-end

<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" target="_blank">![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)</a>
<a href="https://pt-br.reactjs.org/" target="_blank">![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)</a>
<a href="https://sass-lang.com/" target="_blank">![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)</a>

## Instalando Dependências

```
docker-compose up -d --build
```
:warning: Atenção :warning: : Ao executar esse comando o docker ira subir ***`3`*** containers 1 para o banco de dados 1 para back-end e outro para front-end, ao terminar o build dos containers o app ja estara rodando.
  - o container do front-end ira subir com servidor na porta `3000`
  - o container do back-end ira subir com servidor na porta `3001`
  - o container do db ira subir na porta padrao do MySQL `3306`

> Para popular o banco de dados

```
npm run db:reset
```

## Executando aplicação

* Ao rodar o comando do docker acima o app ja estara rodando nas portas informadas
