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

### Configuração de Zona DNS

Como meu registro foi comprado pelo [registro.br](registro.br), ele também é gerenciado lá. É preciso configurar para que meu domínio e subdomínios estejam apontando para o IP do meu servidor.  
Adicionei uma entrada do Tipo **A** com o nome que gostaria, por exemplo, `server` e o endereço IPv4 do meu servidor.  
Com isso, quando alguém acessar `server.gymora.com.br` vai apontar para meu servidor.  
Para testar se já está funcionando é só rodar um 
```bash
ping server.gymora.com.br
```

E o `ping` deve responder com o IP do servidor.

