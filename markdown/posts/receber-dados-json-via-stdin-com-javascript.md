---
type: post
title: Receber dados/JSON via STDIN com Javascript
description: Há pouco tempo tive um desafio de criar uma CLI e criei sem nenhuma
  lib externa, uma forma de receber os dados do STDIN e transformar em um objeto
  Javascript
date: 2024-10-28 06:03:00
image: /assets/img/snippet-1-.png
category: js
tags:
  - javascript
  - js
  - stdin
  - json
  - cli
  - ""
---
Tive recentemente um desafio de criar uma CLI (Command Line Interface), que nada mais é um programa que usamos pelo terminal.\
Um dos desafios do código era receber um JSON como input dos dados. 
Sendo possível dois tipos de entrada:  

## Com o usuário digitando os dados

```shell
lucas in dev/lucas/readline is 📦 1.0.0 via ⬢ v18.20.2 
➜ node index.js
{"key":"value"}

[{"key":"value"}]
```

Dessa forma, a pessoa digita o JSON, dá enter, isso significa uma linha de input. Na segunda linha, a pessoa poderia digitar um novo JSON ou em caso de não digitar nada, iniciaria o processamento da ferramenta. Neste caso é apenas um `console.log`

## Com input redirection

```shell
lucas in dev/lucas/readline is 📦 1.0.0 via ⬢ v18.20.2 took 12,5s 
➜ node index.js < input.txt 
[{"key":"value"}]
```

Dessa forma, o usuário utiliza [input redirection](https://www.geeksforgeeks.org/input-output-redirection-in-linux/) que é uma forma muito comum de ser utilizada em aplicações de linha de comando quando lidamos com inputs muito grandes.

## Como resolvi esse problema.

```javascript
import readline from "readline";

export const readFileInput = () => {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  let allArrays = [];

  return new Promise((resolve) => {
    rl.on("line", (line) => {

      if (line.trim() === '') {
        rl.close();
        return;
      }

      const jsonArray = JSON.parse(line.trim());
      allArrays.push(jsonArray);
    });

    rl.on("close", () => {
      resolve(allArrays);
    });
  });
};
```

Dei uma olhada na documentação do [NodeJS - Readline](https://nodejs.org/api/readline.html) para entender um pouco como funciona.\
O primeiro passo é criar uma interface para receber os dados. Utilizamos a biblioteca `readline` do NodeJS.\
Passamos como parâmetros 1 informação necessária:

* `input`: De onde vem os dados, no nosso caso `process.stdin`.

`createInterface` pode receber outros parâmetros, isso pode ser visto na [documentação do Node](https://nodejs.org/api/readline.html).

A biblioteca extende do [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter) e trabalhamos escutando eventos.

### Evento `line`

Com esse evento, pegamos cada linha digitada e podemos tomar alguma ação com ela.
No nosso caso, primeiro verificamos se não está vazio, sinal que o usuário não digitou nada, e caso esteja em branco, chamamos `rl.close();` para encerrar o input dos dados. Caso tenha algum conteúdo pegamos o conteúdo da linha `line`  removemos caracteres em branco no final `line.trim()` e transformamos em JSON `JSON.parse(line.trim())`.\
No final, pegamos esse objeto e colocamos em um array para processarmos essa informação posteriormente.

### Evento `close`

Este evento significa que a interface foi encerrada.  
Resolvemos a `Promise` com os dados digitados.

### `Promise` envolvendo os eventos

Note que temos uma `return new Promise` em volta dos eventos, fazemos isso para que seja possível pegar o que foi digitado e armazenar em uma variável. Como o processo de digitar os dados e encerrar a interface no terminal é um processo assíncrono, precisamos dessa `Promise` com um `resolve` no evento de `close`.  
Assim podemos usar essa função da seguinte maneira:

```javascript
const data = readFileInput()
```

Onde `data` vai conter um array de objetos que são as linhas inseridas na aplicação.
