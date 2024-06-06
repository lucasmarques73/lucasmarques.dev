---
type: post
title: ACID e transações em banco de dados
description: Neste post vamos falar um pouco sobre ACID e transações em banco de dados
date: 2024-06-06 04:00:00
image: /assets/img/acid-smaller.png
category: misc
tags:
  - acid
  - database
  - transations
---
![acid and database](/assets/img/acid-smaller.png "acid and database")

## O que são transações em banco de dados?

Uma transação em banco de dados é uma operação ou sequência de operações tratada como unidade, com uma única lógica de trabalho.

Transações são totalmente executadas ou totalmente não executadas.

Exemplo: 

> Transferir dinheiro entre contas, temos que remover o saldo da primeira conta e adicionar saldo na segunda conta.
>
> Em caso de erros, não podemos executar metada das operações.

## ACID

É uma sigla para as quatro principais características que definem uma transação.
