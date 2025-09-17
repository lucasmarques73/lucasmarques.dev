---
type: post
title: Trocando a versão do Node automaticamente no PowerShell com nvm
description: Automatizei a versão do Node no PowerShell com NVM e .nvmrc
date: 2025-09-17 10:54:00
image: https://repository-images.githubusercontent.com/24268127/6b76a23f-40d7-4c68-ad10-fe2abc404f66
category: js
tags:
  - node
  - nvm
  - nvmrc
  - powershell
  - windows
---
Recentemente precisei configurar meu ambiente no Windows para que o PowerShell lesse o arquivo `.nvmrc` e trocasse automaticamente a versão do Node.
No Linux e no Mac isso já é bem comum, mas no Windows não vem pronto. Depois de alguns testes, cheguei a uma solução que vou compartilhar aqui.

## Instalando o NVM no Windows

Antes de tudo, precisamos do NVM — o Node Version Manager.
No Windows não usamos o mesmo NVM que existe no Linux/Mac, mas sim o projeto [nvm-windows](https://github.com/coreybutler/nvm-windows)

Você pode instalar de duas formas:

1. Instalador oficial

 - Baixe o `.exe` na página de [releases](https://github.com/coreybutler/nvm-windows/releases)
 - Rode o instalador e siga os passos (ele vai pedir a pasta onde as versões do Node ficarão).

2. Via Chocolatey

 Se você usa Chocolatey, basta rodar:
```powershell
choco install nvm
```

### Observação

No fim, os dois métodos instalam a mesma ferramenta (nvm-windows).  
A diferença é só a forma de gerenciar:

- Pelo .exe você controla manualmente a versão instalada.
- Pelo Chocolatey você ganha atualização fácil (choco upgrade nvm).

Depois de instalar, confirme se está tudo certo:

```powershell
nvm version
```

Se aparecer a versão do NVM, você já pode seguir.

## O que é o `$PROFILE` do PowerShell?

O `$PROFILE` é um script que o PowerShell executa sempre que você abre o terminal.
É como se fosse o `.bashrc` ou `.zshrc` do Linux.

Você pode ver o caminho do seu `$PROFILE` assim:
```powershell
echo $PROFILE
```

E abrir para editar com:
```powershell
notepad $PROFILE
```

Tudo que você colocar ali vai ser carregado automaticamente quando abrir o PowerShell.

## Automatizando o uso do `.nvmrc`

No Linux/Mac é comum usar um plugin para que, ao entrar numa pasta com `.nvmrc`, a versão do Node seja trocada automaticamente.  
Vamos fazer isso no Windows sobrescrevendo a função `Set-Location` (que é o comando `cd` do PowerShell).  

A ideia é simples:

- Sempre que você mudar de diretório, o script vai verificar se existe um `.nvmrc`.

Se existir, ele lê a versão, instala se não estiver disponível e troca automaticamente.

## Script final

Adicione esse código no final do seu `$PROFILE`:

```
# --- Auto NVM (.nvmrc) ---
function Set-Location {
    param([string]$path)

    Microsoft.PowerShell.Management\Set-Location $path

    $nvmrcPath = Join-Path (Get-Location) ".nvmrc"
    if (Test-Path $nvmrcPath) {
        $version = (Get-Content $nvmrcPath | Select-Object -First 1).Trim()

        # Remove "v" inicial (ex: v22.16.0 -> 22.16.0)
        if ($version -match "^v") {
            $version = $version.Substring(1).Trim()
        }

        # Lista versões instaladas
        $installed = nvm list | ForEach-Object {
            if ($_ -match "\d+(\.\d+){0,2}") { $matches[0].Trim() }
        }

        # Verifica se já está instalada
        $match = $installed | Where-Object {
            ($_ -eq $version) -or ($_ -like "$version.*")
        }

        if (!$match) {
            Write-Host "Node $version not found, installing..."
            nvm install $version | Out-Null
        }

        nvm use $version | Out-Null
        Write-Host "Now using Node $version"
    }
}
```

## Testando

Crie um arquivo `.nvmrc` no seu projeto, por exemplo:
```powershell
echo v22.16.0 > .nvmrc
```

Abra o PowerShell e navegue até a pasta do projeto:
```powershell
cd caminho/do/projeto
```

Você deve ver algo como:
```powershell
Now using Node 22.16.0
```

E pronto 🎉
Agora sempre que você entrar em um projeto com `.nvmrc`, a versão do Node será ajustada automaticamente.

## Conclusão

Essa configuração economiza tempo e evita erros ao trabalhar com múltiplos projetos que usam versões diferentes do Node.  
Isso ajuda muito para que todas as pessoas do time utilizem a sempre a mesma versão do Node.

Com esse ajuste no `$PROFILE`, o PowerShell passa a se comportar igual ao terminal no Linux/Mac, respeitando o `.nvmrc` sem precisar de plugins externos.
