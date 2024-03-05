---
type: post
title: Alterando o nome de sua branch principal
description: Após uma sugestão de @Una no twitter, resolvi trocar o nome da
  branch principal nos meus projetos.
date: 2020-06-16 07:25:24
image: /assets/img/una-twitter.png
category: dev
tags:
  - git
  - branch
---

Recentemente tivemos vários [protestos acontecendo pelo mundo](https://oglobo.globo.com/fotogalerias/vidas-negras-importam-mundo-fura-quarentena-para-protestar-contra-racismo-24466825) com o papel principal de mostrar que Vidas Negras Importam [\#BlackLivesMatter](https://twitter.com/search?q=%23BlackLivesMatter&src=typeahead_click).

Com isso, uma [pessoa no Twitter](https://oglobo.globo.com/fotogalerias/vidas-negras-importam-mundo-fura-quarentena-para-protestar-contra-racismo-24466825), sugeriu-nos que alterássemos o nome da branch principal em nossos repositórios, geralmente chamada de **master**, onde esta palavra tem uma referência ao trabalho escravo.

![Tweet da pessoa @Una](/assets/img/una-twitter.png "Tweet da pessoa @Una")

Eu gostei muito da ideia e aderi aos meus projetos. Neste post vou demonstrar como fiz essa alteração.

## Alterando a branch no repositório local

Para isso, eu resolvi mover a branch **master** para a nova branch que vamos chamar de **main**, como sugeriu [@Una](https://twitter.com/Una).

```shell
git branch -m master main
```

Desta forma, eu já crio uma nova branch localmente e vou para ela. Esta nova branch é exatamente igual a branch anterior.

## Subindo a nova branch

Após criar a nova branch, precisamos subir ela para nosso repositório,que no caso é o github.

```shell
git push -u origin HEAD
```

## Alterando a configuração no github

Já no github, dentro do meu repositório, fui até a aba de configurações e no menu lateral esquerdo, selecionei a opção **Branches**.

![Configurações de branches do github](/assets/img/github-settings-branch.png "Configurações de branches do github")

Aqui temos a opção de alterar a nossa branch principal. Após escolher o nome da nova branch, é só clicar no botão **Update** e já está feito.

## Removendo a branch antiga

Para finalizar, vamos apagar a branch antiga pois ela não é mais necessária em nosso projeto. Para isso, voltei a página do meu repositório. Cliquei na opção onde é mostrado todas as branchs do projeto.

![Selecionando a opção branches no github](/assets/img/repo-options.png "Selecionando a opção branches no github")

Agora com a listagem de todas as branchs do projeto, é só clicar na lixeira para excluir a branch antiga.

![Excluindo branch antiga.](/assets/img/selected-trash-to-branch.png "Excluindo branch antiga.")

Com isso, finalizamos nossa alteração de branch principal em nosso repositório no github. E deixamos de ter uma referência ao trabalho escravo em nosso projeto.

Deixo aqui um [Link](https://revistaglamour.globo.com/Lifestyle/noticia/2019/04/17-palavras-e-expressoes-racistas-que-ninguem-deveria-usar-mais.html) com algumas palavras e expressões que nós deveríamos pensar melhor antes de utilizá-las, pois são relacionadas ao racismo.

Valeu pessoas por terem lido até aqui. Até a próxima.
