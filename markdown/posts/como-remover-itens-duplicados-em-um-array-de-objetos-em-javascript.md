---
type: post
title: Como remover itens duplicados em um array de objetos em javascript
description: Neste post vou mostrar como podemos remover os itens duplicados de
  um array de objetos baseado em um item deste objeto em javascript
date: 2024-06-27 05:18:00
category: js
tags:
  - js
  - javascript
---
Este é um post bem simples, precisei resolver esse problema na empresa e resolvi trazer essa anotação para cá, pois pode me ajudar no futuro e ajudar outros desenvolvedores.

Primeiro ponto, existem várias formas de fazer isso, usando `filter`, `forEach`, `JSON.stringfy` e etc.

\
Essa solução utiliza uma classe pouco lembrada do Javascript chamada [Map](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Map). Ela permite criarmos um mapa de chave-valor onde a chave é uma string única dentre as chaves e o valor pode ser qualquer coisa, no nosso caso é um objeto.

## Problema

Queremos transformar isso:

```javascript
[
    {
        email: 'lucasmarques73@hotmail.com',
        name: 'Lucas Marques'
    },
    {
        email:'john.doe@email.com',
        name: 'John Doe'
    },
    {
        email: 'lucasmarques73@hotmail.com',
        'name': 'Lucas Cesar Marques'
    }
]
```

Em isso:

```javascript
[
    {
        email: 'lucasmarques73@hotmail.com',
        name: 'Lucas Cesar Marques'
    },
    {
        email:'john.doe@email.com',
        name: 'John Doe'
    }
]
```

## Solução

Digamos que vamos utilizar o email como chave para que, caso aja mais de um usuário com o mesmo email, a gente possa remover os usuários duplicados.

```javascript
const users = [
    {
        email: 'lucasmarques73@hotmail.com',
        name: 'Lucas Marques'
    },
    {
        email:'john.doe@email.com',
        name: 'John Doe'
    },
    {
        email: 'lucasmarques73@hotmail.com',
        'name': 'Lucas Cesar Marques'
    }
]

const usersMap = new Map(
  users.map(u => [u.email, u])
)

const uniqueUsers = [...usersMap.values()]
```

Nesta solução nós criamos um mapa utilizando o \`email\` como chave. Então, se houver outro usuário com o mesmo email, vamos estar sempre utilizando os dados do último item encontrado no array.

Finalizamos com o método \`values()\` pois ele vai retornar um array com os valores do mapa, jogando fora a estrutura chave-valor e teremos apenas um array de objetos novamente.
