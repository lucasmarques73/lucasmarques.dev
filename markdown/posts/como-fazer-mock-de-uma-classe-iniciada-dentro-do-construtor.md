---
type: post
title: Como fazer mock de uma classe iniciada dentro do construtor
description: Neste post vou mostrar como fazer o mock de uma classe que é
  iniciada dentro do contrutor usando o Jest.
date: 2024-05-21 09:33:47
category: js
tags:
  - js
  - jest
  - test
  - mock
---
## Descrevendo o problema.

Sabe quando temos uma classe e no método construtor da classe iniciamos outra classe.
Essa nova classe é uma dependência e há várias maneiras de lidarmos com isso. Há forma mais simples é como o exemplo abaixo:

```javascript
// emailService.js
class EmailService {

    sendEmail() {
        console.log('Sent..')
    }
}

// resetPasswordUseCase.js
import EmailService from './emailService.js'

class ResetPasswordUseCase {
    emailService

    constructor() {
        this.emailService = new EmailService()
    }


    execute(email) {

        // Regras de necógio
        // Envio do email
        this.emailService.sendEmail()
    }
}
```

Neste exemplo, o caso de uso `ResetPasswordUseCase` tem como dependência a classe `EmailService`, que seria responsável pelo envio do email. 
Este é um cenário muito comum quando não usamos injeção de dependência.

E o problema?
Para testar o caso de uso, um dos casos de teste é verificar se o `this.emailService.sendEmail()` foi chamado corretamente.
E como vamos fazer o mock dessa função dado que ela se inicia dentro do construtor do caso de uso.

## Como resolvi esse problema.

Usando o jest podemos fazer o mock no momento em que o `import` acontece e dessa forma ele vai usar a classe modificada ao invés da original.

```javascript
jest.mock('./emailService', () => {
    return {
      ...(jest.requireActual('./emailService')),
      EmailService: jest.fn().mockImplementation(() => ({
        sendEmail: () => jest.fn().mockResolvedValue(null),
      })),
    }
  })
```

Dessa forma a gente intercepta o `import` e ele vai usar o código que colocamos dentro do `jest.mock` para iniciar a classe `EmailService` e o método `sendEmail` é um mock do Jest que podemos verificar quantas vezes foi chamado, com quais argumentos, etc.
