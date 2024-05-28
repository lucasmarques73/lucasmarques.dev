---
type: post
title: Como fazer mock de uma classe quando usamos injeção de dependência.
description: Neste post vou mostrar como fazer o mock de uma classe que é
  enviada para outra através de injeção de dependência usando o Jest.
date: 2024-05-28 08:20:00
image: /assets/img/jest-mock-depedency.png
category: js
tags:
  - js
  - jest
  - test
  - mock
---
## Antes do problema, vamos entender um pouco sobre injeção de dependência

Hoje em dia, com códigos cada vez mais complexos, é normal que uma classe dependa de outras para seu total funcionamento.\
Podemos construir essa classe que dependemos de diversas maneiras. A mais comum é construindo direto dentro do construtor como descrevi neste [post](https://lucasmarques.dev/como-fazer-mock-de-uma-classe-iniciada-dentro-do-construtor). Outra maneira é receber a classe já construída como um argumento do método construtor da classe como no exemplo a seguir.

```javascript
// resetPasswordUseCase.js
class ResetPasswordUseCase {

    constructor({emailService}) {
        this.emailService = emailService
    }

    execute(email) {

        // Regras de necógio
        // Envio do email
        this.emailService.sendEmail(email)
    }
}
```

E para que tudo isso funcione, normalmente temos um gerenciador de dependências como [Awilix](https://www.npmjs.com/package/awilix) ou podemos fazer tudo manualmente.  
Normalmente teremos um `container.js` que será responsável por construir e injetar as dependências.

```javascript
// resetPasswordUseCase.js
class ResetPasswordUseCase {

    constructor({emailService}) {
        this.emailService = emailService
    }

    execute(email) {

        // Regras de necógio
        // Envio do email
        this.emailService.sendEmail(email)
    }
}

// emailService.js
class EmailService {

    sendEmail() {
        console.log('Sent..')
    }
}

// container.js
const emailService = new EmailService();
const resetPasswordUseCase = new ResetPasswordUseCase({emailService});
   
```

## Descrevendo o problema

Neste exemplo, temos que construir nossa classe mock antes do caso de uso e passar ele ao iniciar o caso de uso.\
Desta maneira, ao darmos o `new ResetPasswordUseCase({emailService})` temos que passar o objeto mock que implemente a mesma interface da classe `EmailService`. 

```javascript
// resetPasswordUseCase.test.js
const emailService = {}

const useCase = new ResetPasswordUseCase({emailService})
```

No exemplo falta implementarmos nosso mock.

## Como resolvi esse problema

Esse é um cenário simples, basta criarmos um objeto com o método `sendEmail` e esse método vai ser um `jest.fn().mockResolvedValue(null)` no caso de `promise` ou `jest.fn().mockReturnValue(null)`.

```javascript
// resetPasswordUseCase.test.js
const emailService = {
    sendEmail: jest.fn().mockResolvedValue(null)
}

const useCase = new ResetPasswordUseCase({emailService})
```

Com isso, quando o caso de uso for executado, ele irá utilizar nossa função do Jest e podemos verificar quantas vezes foi chamado e com quais argumentos.
