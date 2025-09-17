---
type: post
title: Configurando VPS da Locaweb
description: Vou subir um projetinho meu na Locaweb e descreverei aqui um pouco
  do passo a passo que fiz.
date: 2025-09-04 12:10:00
image: https://www.locaweb.com.br/images/produtos/vps-locaweb/adcast/servidor-vps-ilustracao.webp?v=2.2.26
category: devops
tags:
  - locaweb
  - infra
  - docker
  - swarm
  - ""
---
Estou subindo um projeto pessoal, [gymora.com.br](https://gymora.com.br).
  
Depois de fazer muitas pesquisas sobre como subir o backend e o banco de dados utilizando alguma plataforma tipo [Railway](https://railway.com), [Render](https://render.com), [Koyeb](https://www.koyeb.com), etc. Optei pelo mais simples, uma VPS na [Locaweb](https://www.locaweb.com.br/servidor-vps/).  

Com ela eu vou ter um trabalho maior para configurar várias coisas, mas o mais importante pra mim no momento é eu sempre vou pagar o mesmo preço mensalmente e tendo as configurações do servidor que contratei.  

E claro, poderei aprender mais sobre Infra, DevOps, deploy com pouco dinheiro, algumas ferramentas como Docker Swarm, Traefik, etc.  

Abaixo vou listar cada coisa que fiz para ter o servidor funcionando, como eu acesso ele, monitoro, etc.  

## Setup Inicial

### Setup do servidor na Locaweb

Criar um servidor na Locaweb é bem simples, após escolher qual as configurações do servidor e efetuar o pagamento. Eles vão enviar um email para o Setup Inicial.

Nós escolhemos um nome, após isso podemos escolher entre um Sistema Operacional zerado ou uma aplicação onde já vêm algumas coisas instaladas. No meu caso, foi um SO zerado. Escolhi o Ubuntu, pois já tenho mais familiaridade.

Depois ele pede pra você configurar uma senha para acessar o servidor ou uma chave ssh. Você escolhe o que for melhor pra você.

Após a instalação do servidor, você consegue acessar o painel administrativo e ver algumas informação do servidor como IPv4, Domínio da Locaweb, entre outras coisas.


### Configuração de Zona DNS

Como meu registro foi comprado pelo [registro.br](registro.br), ele também é gerenciado lá. É preciso configurar para que meu domínio e subdomínios estejam apontando para o IP do meu servidor.  

Adicionei uma entrada do Tipo **A** com o nome que gostaria, por exemplo, `server` e o endereço IPv4 do meu servidor.  

Com isso, quando alguém acessar `server.gymora.com.br` vai apontar para meu servidor.  

Para testar se já está funcionando é só rodar um 
```bash
ping server.gymora.com.br
```

E o `ping` deve responder com o IP do servidor.

### Acessando o servidor via SSH

Primeira vez acessando o servidor, só temos acesso com o usuário `root`. E como eu configurei acesso via chave ssh, eu acesso da seguinte forma:

```bash
ssh -i ~/.ssh/minha_chave root@server.gymora.com.br
```

Ao acessar o servidor pela primeira vez, gosto e recomendo as seguintes etapas

#### Primeiro acesso ao servidor via SSH

- Adicionar um novo usuário e conceder privilégios de root
```bash
adduser lucas

usermod -aG sudo lucas

usermod -aG root lucas
```

- Remover acesso via senha e acesso root
```bash
# Abrir o arquivo de configuração SSH
sudo nano /etc/ssh/sshd_config

# Modificar as seguintes linhas
# PermitRootLogin no # Disabilita o login com root usuário
# PasswordAuthentication no  # Disabilita o login com senha

# Reinicia o serciço SSH
sudo systemctl restart ssh
```

- Configurar um Firewall (UFW)
```bash
# Instalar o UFW
sudo apt install ufw

# Permitir somentes as portas necessárias
sudo ufw allow OpenSSH    # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS

# Habilita o UFW
sudo ufw enable

# Verifica UFW
sudo ufw status
```

Com isso, finalizamos a primeira parte da configuração do servidor.

#### Dica para facilitar

Agora, gosto de criar uma configuração para facilitar meu dia a dia, pois lido com mais de uma chave ssh.

Podemos criar dentro de `.ssh/` um arquivo chamado `config` .  

Abro com o VS Code para simplificar

```bash
code ~/.ssh/config
```

E coloco a seguinte configuração

```
Host gymora-server
  HostName server.gymora.com.br
  User lucas
  IdentityFile ~/.ssh/minha_chave
```

Onde:
- `Host` é o nome que irei utilizar para acessar futuramente.
- `HostName` é o endereço que configurei no Registro.br
- `User` é o novo usuário que criei
- `IdentifyFile` é o caminho da chave ssh que estou usando.

Assim consigo acessar da seguinte forma.

```bash
ssh gymora-server
```

### Acesso SSH configurado, hora de configurar o servidor

A primeira coisa que gosto de fazer é atualizar o SO.

```bash
sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y
```

Assim atualiza tudo que já está instalado nele.

Agora vou começar a instalar as ferramentas que gosto de usar no dia a dia dentro do servidor.

As primeiras ferramentas são
```bash
sudo apt install -y \
  curl \
  git \
  ufw \
  build-essential \
  htop \
  software-properties-common \
  ca-certificates
``` 

Isso eu considero essencial para ter em qualquer computador Ubuntu.  
Como estou acostumado no meu terminal do meu computador, gosto também de instalar o `zsh` com o `oh-my-zsh` e alguns plugins.

Assim mantenho o ambiente do meu terminal local com meu servidor o mais parecido possível.

```bash
sudo apt install zsh
```

- [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh?tab=readme-ov-file#basic-installation)
- [spaceship-prompt](https://github.com/spaceship-prompt/spaceship-prompt?tab=readme-ov-file#-installation)
- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#oh-my-zsh)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#oh-my-zsh)
- [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search?tab=readme-ov-file#install)

E deixo a seguinte configuração no meu `.zshrc`

```
ZSH_THEME="spaceship"

SPACESHIP_USER_SHOW=always
SPACESHIP_USER_PREFIX="🔥 PROD 🔥 "
SPACESHIP_USER_SUFFIX=" "
SPACESHIP_TIME_SHOW=true

ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#663399,standout"
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE="20"
ZSH_AUTOSUGGEST_USE_ASYNC=1

```

