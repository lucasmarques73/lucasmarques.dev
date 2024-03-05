---
type: post
title: Criando testes para API Node
description: Neste post vou demonstrar como criar testes para nossa API Node
date: 2020-06-08T03:57:46.000Z
image: /assets/img/npm-t-.png
category: js
tags:
  - testes
  - js
  - jest
  - supertest
---
No post anterior nós [criamos uma API Node e colocamos ela online na Heroku](https://lucasmarques.dev/deploy-de-uma-api-node-na-heroku/). Agora, vou demonstrar como podemos fazer testes de API para ela.\
Antes de tudo,  é bom entendermos do que se trata.  

O teste de API consiste em simularmos chamadas em nossas rotas, como nosso frontend faria, e comparar o resultado que veio com o nosso resultado esperado. Se nossa rota se comporta como esperado, o teste vai passar. Devemos também, testar cenários onde quem consome nossa API passe dados inválidos e como nossa API deve se comportar.  

Por exemplo, temos uma rota que busca usuários por id, neste caso, devemos ter um teste para quando encontramos o usuário esperado e quando não encontramos o usuário. Se há validações do id, devemos ter um teste onde passamos um id inválido e ele retorne a resposta esperada.

Agora que já explicamos algumas coisas, vamos para o código.\
Este projeto está no [github](https://github.com/lucasmarques73/node-api-heroku).

Separamos ele em quatro arquivos.

## app.js

Neste arquivo vai estar descrito nossas rotas e cada método que deve ser executado para cada uma dessas rotas. Repare que temos uma rota que busca todos os usuários e uma que busca usuários por id. Outro detalhe importante é não iniciamos nosso servidor neste arquivo, exportamos nosso app para podermos testar ele.

```javascript
const express = require("express");
const app = express();

app.use(express.json());

const users = require("./users");

app.get("/", (_, res) => res.send("Ok"));
app.get("/health", (_, res) => res.send("Healthy"));
app.get("/users", (_, res) => res.send(users));
app.get("/users/:id", (req, res) => {
  const user = users.find((element) => element.id === Number(req.params.id));

  if (typeof user === "undefined") return res.sendStatus(404);

  return res.send(user);
});

module.exports = app;
```

## users.js

 Atualmente os usuários são uma constante com um array de usuários.

```javascript
const users = [
  { id: 1, name: "João" },
  { id: 2, name: "Mateus" },
  { id: 3, name: "José" },
];

module.exports = users;
```

## index.js

Aqui que nós importamos nosso app e rodamos nosso servidor.

```javascript
const app = require("./src/app");
const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`Server running in ${port}`)
);
```

Agora nossa aplicação está com mais recursos, foram adicionas mais rotas e assim começamos a ter mais responsabilidades em nosso projeto. Uma boa estratégia agora, é garantir que nosso código funciona. Garantir que quando eu peça um usuário de um determinado id, ele me devolva o usuário correto. Pode parecer simples, dado nossa implementação, mas nosso teste vai garantir que caso alguém altere a regra de como buscamos nossos usuários por id, ele ainda continue devolvendo o usuário correto.\
E assim, vamos escrever testes para todas nossas rotas.

## app.test.js

Vou quebrar este arquivo para que a explicação possa ficar o mais clara possível.

### Pacotes necessários

Antes de mais nada, vamos instalar os pacotes necessários para executarmos nossos testes.\
Neste projeto vamos utilizar o [jest](https://jestjs.io/) como nosso framework de testes. E para simular as requisições em nosso projeto. O pacote [supertest](https://www.npmjs.com/package/supertest) foi utilizado.

Para instalar os pacotes rode em seu terminal o seguinte comando:

```shell
npm install --save-dev jest supertest
```

### Configurando o Jest

Existem algumas [configurações](https://jestjs.io/docs/pt-BR/configuration) para o framework na hora do teste.\
Para este projeto, escolhemos configurações básicas. Essas configurações ficam dentro de **jest.config.js** na raíz do projeto.

```javascript
module.exports = {
  testEnvironment: "node",
};
```

#### Entendendo o arquivo de configuração

* **testEnvironment** ambiente onde vai ser rodado os testes, no nosso caso, uma API Node. Podendo ser um navegador como ambiente, caso seja uma aplicação frontend.

### Explicando as funções usadas no arquivo de testes

#### describe

Utilizamos esta função para agrupar alguns casos de testes (veremos melhor issso à frente).\
Podemos também, dentro de um describe, preparar nossos cenários de testes, com mocks e algumas chamadas de métodos.

#### test

Utilizamos esta função para agrupar a execução do método testado e a verificação dos dados esperados.

#### expect

Utilizamos esta função para comparar a resposta do método a ser testado com a resposta esperada.\
Dentro do [jest](https://jestjs.io/) temos uma [variadade de possibilidades para comparação](https://jestjs.io/docs/en/using-matchers).

### Imports corretos

Então vamos importar o pacote dos testes, o nosso app propriamente dito e nossos usuários, isso facilita na hora de comparar os dados vindos da API com os dados que estão simulando nossa base de dados.

```javascript
const request = require("supertest");
const app = require("./app");

const users = require("./users");
```

Com tudo importado, podemos começar a escrever nossos testes para cada rota que temos, validando se as repostas recebidas são as respostas esperadas.

#### Testando a rota "/"

Essa é uma rota bem simples, que deve apenas devolver um **Ok** como texto. Por isso, nós simulamos a requisição para essa rota e com a resposta, nós verificamos se o texto é igual ao que esperamos e também, se veio com o status code correto.

```javascript
describe("GET / ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Ok");
    expect(response.statusCode).toBe(200);
  });
});
```

#### Testando a rota "/health"

Similar ao exemplo anterior, temos que garantir que a resposta para a requisição é a esperada.

```javascript
describe("GET /health ", () => {
  test("It should respond with an Healthy", async () => {
    const response = await request(app).get("/health");
    expect(response.text).toEqual("Healthy");
    expect(response.statusCode).toBe(200);
  });
});
```

#### Testando a rota "/users"

Esperamos que rota traga todos os usuários da nossa aplicação.\
Com isso, simulamos a chamada na rota, comparamos o corpo da requisição com a lista de usuários que importamos. Neste caso, são os mesmos valores, e verificamos também o status code correto.

```javascript
describe("GET /users ", () => {
  test("It should respond with an array of users", async () => {
    const response = await request(app).get("/users");
    expect(response.body).toEqual(users);
    expect(response.statusCode).toBe(200);
  });
});
```

#### Testando a rota "/users/:id"

Esta é a rota onde temos uma regra de negócio, nela devemos trazer somente o usuário do **id** especificado.\
Temos dois casos de teste nesta rota, (I) quando encontramos o usuário esperado, onde nós sabemos qual usuário estamos procurando e sabemos o que nossa API deve responder.  

E (II) quando buscamos um id que, atualmente, sabemos ser inexistente em nossos usuários e a resposta deve ser apenas o status code de: "Não Encontrado".

```javascript
describe("GET /users/:id ", () => {
  const expectedUser = { id: 2, name: "Mateus" };

  test(`It should respond with an user id ${expectedUser.id}`, async () => {
    const response = await request(app).get(`/users/${expectedUser.id}`);
    expect(response.body).toEqual(expectedUser);
    expect(response.statusCode).toBe(200);
  });

  test(`It should respond with not found user status code`, async () => {
    const unexpectedId = 99;
    const response = await request(app).get(`/users/${unexpectedId}`);
    expect(response.statusCode).toBe(404);
  });
});
```

Passamos por todos os testes do nosso projeto, entendemos como cada teste funciona e garantimos o funcionamento de todas as rotas.  

## Rodando os testes

Para isso, adicionamos uma nova chave no nosso package.json:

```json
scripts": {
    ...,
    "test": "jest --watchAll"
}
```

Rodando o novo script:

```shell
npm test
```

Desta forma, nós podemos rodar os testes e, a cada alteração nos arquivos ele vai continuar rodando os testes e exibindo o resultado no terminal.

![Terminal exibindo resultado dos testes](/assets/img/npm-t-.png "Terminal exibindo resultado dos testes")

Nos próximos passos, podemos aprofundar em nossos testes utilizando mock para garantir o comportamento de alguns objetos. Esta é uma boa técnica pois atualmente nós dependemos do nosso conhecimento sobre o arquivo que contém os usuários, caso ele altere, nós também teríamos que corrigir nosso teste. A ideia é removermos essa dependência utilizando mocks.\
Com isso, nossos testes vão funcionar de forma independente da camada que simula nossa base de dados.\
Futuramente, podemos criar testes integrados a uma base de dados e trazer mais segurança no funcionamento de todo o projeto.

Valeu pessoas por terem lido até aqui. Até a próxima.