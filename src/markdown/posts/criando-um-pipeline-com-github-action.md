---
type: post
title: Criando um pipeline com Github Actions
description: Neste post vamos mostrar o que é um pipeline e aprender a criar um
  usando Github Actions.
date: 2021-04-06T05:33:05.000Z
image: /assets/img/github-actions-job-steps.png
category: devops
tags:
  - github
  - github actions
  - pipeline
  - devops
---
Antes de mais nada, devemos saber o que é um pipeline quando falamos de software e por que ele é importante.\
Após isso, vamos criar um pipeline do zero utilizando Github Actions. A ideia é usar esse pipeline para rodar nossos testes e colocar nosso código em produção.

## O que é um pipeline?

Segundo um artigo postado pela [Red Hat](https://www.redhat.com/pt-br/topics/devops/what-cicd-pipeline), "Um pipeline de CI/CD consiste em uma série de etapas a serem realizadas para a disponibilização de uma nova versão de um software."  

O pipeline nada mais é que um arquivo onde declaramos essas etapas. Existem diversas ferramentas para criarmos e executarmos esses pipelines, por exemplo: [Jenkins](https://www.jenkins.io), [TravisCI](https://travis-ci.org), [Azure Pipelines](https://azure.microsoft.com/pt-br/services/devops/pipelines/), entre outos.  
Em nosso caso o Github Actions, vai ler e executar cada passo. Os principais passos desse arquivo são:

* **Preparação do ambiente**: onde instalamos as dependências e pacotes necessários para o projeto.
* **Testes**: após o ambiente preparado, nós vamos executar nossos testes. Eles podem ser vários e geralmente executados em paralelo.
* **Implantação**: com nossos testes passando, subimos ele para nosso ambiente. Ele pode ser um ambiente de validação, caso dependa de alguma aprovação de negócio, ou de produção, quando tudo já está validado.  

## Por que ele é importante?

Após entendermos o que é um pipeline, temos que endenter o porquê dele ser tão importante. Nele descrevemos cada etapa necessária para colocar o código em produção, essas etapas, são geralmente executadas manualmente e podem haver falhas, como por exemplo, não rodar um tipo de teste. Essas falhas podem nos gerar problemas no futuro.  

Com nosso arquivo contendo cada etapa, ele vai executar todas e caso alguma falhe, ele aborta e não coloca o código em produção.

## Github Actions

Como dito anteriormente, ele nada mais é que uma das ferramentas que podemos utilizar para colocar nosso pipeline em ação. A principal diferença entre elas é como o arquivo é criado, o conceito por trás do pipeline e da cultura DevOps utilizando CI/CD é a mesma. O primeiro passo é criar no projeto um arquivo de configuração. Este arquivo vai descrever os passos que nosso pipeline do Github Actions vai executar.

O arquivo deve estar dentro de uma estrutura específica para que o Github saiba ler ele.

Vamos então seguir a seguinte estrutura **.github/workflows/tests.yml**. O arquivo **tests.yml** é nosso pipeline que vai executar nossos testes.

## Explicando o arquivo em partes

O arquivo completo pode ser visto clicando [aqui](https://github.com/lucasmarques73/node-api-heroku/blob/main/.github/workflows/tests.yml). Ele pode ter sofrido alterações durante novos posts.

### name

A primeira parte do arquivo, nós colocamos o nome da **Action** que estamos criando.

```yaml
name:Tests
```

Na aba **Actions** no Github, vai ficar da seguinte forma.

![Exibindo a Aba de Actions no Github](/assets/img/action-name.png "Exibindo a Aba de Actions no Github")

### on

Seguindo no arquivo, temos a configuração de quando queremos que esta **Action** seja executada.

```yaml
on:
  push:
    branches:
      - main
```

Em nosso caso, ela vai ser executada sempre que houver um **push** na nossa branch **main**.

### jobs

Atualmente temos apenas um **job** que vamos chamar de **tests**. A ideia é que ele faça o necessário para rodar os testes.\
Dentro do nosso **job** nós definimos em qual ambiente ele vai executar e os passos que ele deve seguir.

```yaml
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
   # Vamos descrever cada passo de forma detalhada.
```

#### step 1 - Checkout

A primeira coisa que devemos fazer, é baixar nosso repositório. Pra isso, já temos uma **action** do próprio **Github**.

```yaml
- name: Checkout Repository
  uses: actions/checkout@v2
```

#### step 2 - Setup Node.js

No próximo passo, nós configuramos o **NodeJS** para executarmos nosso projeto.

```yaml
- name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: "12.x"
```

Também temos uma **action** pra isso, e também definimos qual a versão do **NodeJS** que vamos utilizar.

#### step 3 - Prepare cache

Este passo é uma boa prática quando criamos esteiras de integreção contínua. Nele vamos configurar para fazer **cache** dos pacotes que são dependências do projeto. Assim, sempre que for instalar, o processo será mais rápido pois não vai baixar novamente.

```yaml
- name: Prepare cache
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
```

#### step 4 - Install dependencies

Com tudo preparado, vamos instalar as dependências do nosso projeto.\
Um ponto interessante, não utilizamos `npm install`, utilizamos `npm ci`. Ele é similar ao anterior, mas é recomendado para processo automatizados, mais [infos](https://docs.npmjs.com/cli/ci.html).

```yaml
- name: Install dependencies
        run: npm ci
```

#### step 5 - Run tests

Após instalar todas as dependências, vamos rodar nossos testes.

```yaml
- name: Run tests
        run: npm run test:ci
```

Neste passo, nós rodamos o comando `npm run test:ci`, ele vai rodar os testes entendendo que está em um ambiente de **CI** e caso algum teste falhe, ele aborta a etapa.\
O comando foi criado em nosso `package.json`.

```shell
jest --ci
```

Com isso finalizamos o arquivo do nosso primeiro pipeline.\
Ao fazer o commit do código e subir para o Github, ele já vai ler o arquivo e executar nosso pipeline.\
Podemos ver os passos sendo executados dentro da aba **Actions** no Github.

![Exibindo os passos de um pipeline no GihubActions](/assets/img/github-actions-job-steps.png "Exibindo os passos de um pipeline no GihubActions")

## Badge no readme

Agora que temos um pipeline rodando automaticamente sempre que houver um **push** na nossa branch principal, podemos adicionar uma **badge** em nosso readme. A ideia é ele exibir uma imagem dizendo como está nosso pipeline sem a necessidade de acessarmos o Github Actions, é bastante útil em projetos de código aberto onde o pipeline é rodado em lugares que não temos acesso.\
Para adicionarmos ela no readme, basta adicionarmos esse código nele.

```markdown
![Pipeline](https://github.com/lucasmarques73/node-api-heroku/workflows/Pipeline/badge.svg)
```
Lembrando que a url deve corresponder ao seu repositório.  
E o resultado será algo parecido com isso:

![Badge do Github Actions verde porque o pipeline está passando.](/assets/img/pipeline-badge.png "Badge do Github Actions verde porque o pipeline está passando.")

Bom, com isso temos nosso pipeline rodando e uma **badge** para acompanharmos o status do pipeline.   

Nos próximos posts, quero trazer um pouco mais de segurança para nosso repositório, protegendo nossa branch principal de commits diretos, entre outras coisas.

Obrigado por terem lido até aqui. Até a próxima.