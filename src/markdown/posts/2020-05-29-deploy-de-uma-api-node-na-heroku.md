---
type: post
title: Deploy de uma API Node na Heroku
description: Neste post vou mostrar de uma maneira simples, como colocar sua API
  Node online na Heroku
date: 2020-05-29T07:13:18.000Z
image: /assets/img/heroku-signup-screen.png
category: js
tags:
  - js
  - heroku
---

Antes de começar, gostaria de explicar um pouco sobre a [Heroku](https://www.heroku.com/).

Segundo o [Wikipedia](https://en.wikipedia.org/wiki/Heroku), A Heroku é uma plataforma de nuvem como serviço, suportando diversas linguagens de programação. O que isso significa??

Significa que ela oferece recursos como Servidores, Banco de dados, entre outros serviços como a [Amazon](https://aws.amazon.com/pt/) e a [Azure](https://azure.microsoft.com/pt-br/) também fazem. Pra mim, a maior vantagem de utilizar a Heroku, é sua fácil integração com Github (Vou demonstrar isso abaixo) e os recursos disponibilizados de forma gratuita, [mais info](https://www.heroku.com/pricing).

Bom, vamos lá.

Como fazer o deploy de uma API Node na heroku?

Tenho no meu github, um [repositório](https://github.com/lucasmarques73/node-api-heroku) com uma API que contém apenas uma rota para exemplo.

Este é o código da nossa API:

```javascript
const express = require("express")
const app = express()
const port = 3000

app.get("/", (_, res) => res.send("OK"))

app.listen(process.env.PORT || port, () =>
  console.log(`Server running in ${port}`)
)
```

Um ponto importante para o deploy na heroku, é a utilização correta da variável de ambiente **PORT**, pois com ela que a Heroku disponibiliza sua API na porta **80**.\
Para colocarmos ela online na heroku, o primeiro passo é [criar uma conta](https://signup.heroku.com/) na plataforma:

![Tela de cadastro na Heroku](/assets/img/heroku-signup-screen.png "Tela de cadastro na Heroku")

Após o cadastro feito, nós temos que que criar uma nova aplicação dentro da plataforma. Esta aplicação que será nosso servidor que vai rodar nossa API.

![Dashboard da Heroku, clicando para criar uma nova aplicação](/assets/img/new-app-heroku.png "Dashboard da Heroku, clicando para criar uma nova aplicação")

Quando nós criamos, devemos escolher um nome para nossa aplicação e onde ela vai ser hospedada, neste caso coloquei o nome **node-api-heroku-lm** e a região foi **Estados Unidos**

![Escolhendo nome para aplicação](/assets/img/choose-name-app.png "Escolhendo nome para aplicação")

Após isso, nós vamos ter nossa aplicação na Heroku.\
Ela até já disponibilizou uma **URL** para acessarmos nossa aplicação. E esta url já está utilizando **https**.

![Url da nossa aplicação](/assets/img/url-app.png "Url da nossa aplicação")

Agora, através do dashboard, nós vamos conectar nossa aplicação criada na Heroku, com nosso repositório no Github.

Clico no ícone do Github para conectar com ele, e pesquiso pelo meu repositório. Talvez você tenha que dar permissão de acesso para a Heroku acessar seus repositórios.

![Conectando aplicação Heroku com Github](/assets/img/heroku-choose-github-repo.png "Conectando aplicação Heroku com Github")

Após escolher o repositório, a Heroku já vai fazer o deploy da branch **main** e nossa API já vai estar online.

![Dashboard após conectar com repositório](/assets/img/app-after-conect-github.png "Dashboard após conectar com repositório")

Para confirmar, basta acessarmos a url que foi criada para vermos a resposta da nossa API.

![Aplicação respondendo através da nossa API](/assets/img/api-ok.png "Aplicação respondendo através da nossa API")

Com isso já temos pronto nosso servidor, servindo através de um servidor Node nossa API.\
Uma coisa que gosto de fazer, é habilitar o deploy automático. Com isso, sempre que nossa branch main tiver alterações, automaticamente vai ser feito deploy dela. Um ponto importante sobre isso, é que ainda não temos uma esteira de build, ou seja, ele não vai rodar testes ou qualquer coisa para saber se nossa branch realmente pode entrar em produção.

Nos próximos posts pretendo explicar como podemos testar essa nossa API e após isso, fazer os testes serem executados sempre que alterarmos a main, e caso um teste falhe, ele não altere o código de produção, assim, somente com testes passando vamos colocar algo novo em produção.

Valeu pessoas por terem lido até aqui. Até a próxima.
