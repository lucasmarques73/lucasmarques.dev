---
type: post
title: Formatei meu PC e agora? [Ubuntu]
description: Acabei de formatar meu notebook e quero anotar aqui cada programa
  que irei instalar, isso vai me ajudar quando formatar de novo no futuro.
date: 2025-03-28 04:47:00
image: /assets/img/ubuntu.webp
category: misc
tags:
  - ubuntu
  - format
  - formatar
---
Formatei meu notebook e optei por instalar o [Ubuntu 24.04 LTS](https://ubuntu.com/blog/tag/ubuntu-24-04-lts) como sistema operacional. Trabalho como desenvolvedor de software e ambientes Linux sempre me acompanharam nessa jornada. Já tive alguns scripts para me ajudar quando formatar o computador e conseguir configurar tudo de forma bem rápida e prática. A ideia é trazer isso para um post para que outras pessoas também possam aproveitar disso.

A primeira coisa que faço é instalar um navegador novo, gosto muito do Firefox que vem com o Ubuntu, mas uso ele para outras coisas. Atualmente estou usando Vivaldi como navegador de uso pessoal. Baixo ele do site oficial, um arquivo `.deb` e instalo usado `dpkg -i $caminho-do-arquivo`.

Abaixo vou colocar todos os programas que irei instalando.

## Navegadores
- Vivaldi - Para uso pessoal
- Brave - Para uso do trabalho
- Firefox - Para ambiente de desenvolvimento

### Extensões de navegador
- Bitwarden
- Grammarly
- Language Tools
- GNOME Shell
- Google Translate
- React DevTools (ambiente de desenvolvimento)
- Redux DevTools (ambiente de desenvolvimento)

## Setup do Ubuntu
```
sudo add-apt-repository universe -y
sudo apt update
sudo apt install \
    git \
    curl \
    fonts-firacode \
    htop \
    fonts-hack-ttf \
    gnome-shell-extensions \
    gnome-tweak-tool  -y
```

## Ambiente de Desenvolvimento
- VS Code
- NVM
- Hyper.js (Terminal)

## Configuração do Terminal
- ZSH e Oh-my-zsh
- ZSH Theme


## Outros
- Slack
- Peek (Ferramenta para gravar tela e gerar gif)
- VLC
