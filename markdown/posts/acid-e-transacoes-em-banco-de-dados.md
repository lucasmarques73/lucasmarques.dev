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

### A - Atomicidade

Quando temos várias instruções em uma transação, todas devem ser executadas ou nenhuma é executada. Isso evita perca ou corrupção de dados.

### C - Consistência

A transação deve levar o banco de dados de um estado consistente a outro estado consistente, em caso de erro deve voltar ao estado original, antes do início da transação.

### I - Isolamento

Isolamento serve para que transações paralelas não interfiram umas nas outras.  
Por exemplo, uma pessoa pode estar escrevendo em uma tabela e outra pode estar lendo.  
O Principal objetivo do Isolamento é controlar a concorrência.

### D - Durabilidade

Garante que os dados sejam gravados de maneira correta mesmo em casos de falhas.
