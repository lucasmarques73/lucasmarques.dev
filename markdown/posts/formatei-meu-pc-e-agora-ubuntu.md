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

## Navegadores

* [Vivaldi](https://vivaldi.com/pt-br/download/) - Para uso pessoal
* [Brave](https://brave.com/pt-br/download/) - Para uso do trabalho
* Firefox - Para ambiente de desenvolvimento

### Extensões de navegador

* [Bitwarden](https://bitwarden.com/download/)
* [Grammarly](https://www.grammarly.com/browser/chrome)
* [Language Tools](https://languagetool.org/chrome)
* [GNOME Shell](https://chromewebstore.google.com/detail/integra%C3%A7%C3%A3o-com-gnome-shel/gphhapmejobijbbhgpjhcjognlahblep)
* [Google Translate](https://chromewebstore.google.com/detail/google-tradutor/aapbdbdomjkkjkaonfhkkikfgjllcleb)
* React DevTools (ambiente de desenvolvimento)
* Redux DevTools (ambiente de desenvolvimento)



## Ambiente de Desenvolvimento

* [VS Code](https://code.visualstudio.com/download)
* [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
* [Docker](https://www.locaweb.com.br/ajuda/wiki/install-docker-ubuntu/)
* [docker-compose](https://docs.docker.com/compose/install/standalone/)

## Configuração do Terminal

* [ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#install-and-set-up-zsh-as-default) e [Oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh?tab=readme-ov-file#basic-installation)
* ZSH Theme

  * [spaceship-prompt](https://github.com/spaceship-prompt/spaceship-prompt?tab=readme-ov-file#-requirements)
* ZSH Plugins

  * [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#in-your-zshrc)
  * [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)
  * [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search?tab=readme-ov-file#install)

### zshrc

```
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="spaceship"

SPACESHIP_USER_SHOW=always
SPACESHIP_USER_PREFIX=
SPACESHIP_TIME_SHOW=true
SPACESHIP_BATTERY_SHOW=false
SPACESHIP_PROMPT_ASYNC=false

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  docker
  docker-compose
  nvm
  history-substring-search
  ssh-agent
)

source $ZSH/oh-my-zsh.sh

autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

alias update="sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y"
alias delete-old-branches='git branch | egrep -v "(^\*|master|main)" | xargs git branch -D'
```

## Outros

* Slack
* [Peek](https://github.com/phw/peek?tab=readme-ov-file#ubuntu) (Ferramenta para gravar tela e gerar gif)
* VLC
* Gnome Extensions

  * [Clipboard Indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/)
  * [Bluetooh Battery Meter](https://extensions.gnome.org/extension/6670/bluetooth-battery-meter/)

## Configurações

* Habilitar a Luz Noturna
* Trocar o tema para Dark
* Configurar a Dock

  * Auto-hide
  * Position on Screen - Bottom
