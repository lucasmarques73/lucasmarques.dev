---
type: post
title: Como fazer mock de um componente filho ao testar um componente React
description: Estava criando testes para um componente e o filho dele é um
  componente um pouco complexo, por isso resolvi apenas fazer o mock dele e
  assim evito de redenrizar ele.
date: 2024-11-13 10:03:00
category: react
tags:
  - js
  - jest
  - test
  - mock
---
## Problema

Estava criando testes para um componente onde o filho dele é um `dropdown` com vários controles e uso de alguns `hooks`, etc.
Quando tentava renderizar ele tomava erro, pois ele não conseguia ter tudo para renderizar.
Neste cenário em específico um `hook` customizado está utilizando alguns recursos do `next/navigation` que no momento do teste não podem ser acessados. Dando o erro abaixo:

```bash
Error: Uncaught [TypeError: (0 , _navigation.useRouter) is not a function]
``` 

## Solução

Com o Jest é possível fazer `mock` de qualquer coisa que é importando dentro do componente, então fiz o `mock` do componente filho para que, ao invés de renderizar ele, renderize apenas `<div></div>`. Esse código não tem nenhuma regra, ele é renderizado sem problemas.

O componente que vou fazer o `mock` foi criado da seguinte maneira:
```
export function ComponentName() {}
```

Como ele não tem `export default` tive que lidar com isso no `mock` também.

Então o `mock` ficou da seguinte maneira:
```
jest.mock("./component-name", () => {
  return {
    ComponentName: jest.fn(() => <div></div>),
  };
});
```

E com isso, meu teste pode ser executado sem problemas.
