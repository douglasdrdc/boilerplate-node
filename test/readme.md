## Unit Tests

Este diretório tem como objetivo descrever os testes unitários da aplicação. Para maior detalhamento do coverage por classe é necessário rodar:
> npm run test:coverage

## Configuração do projeto
Para configuração dos testes no projeto foi adotado os seguintes passos:

### Instalação dos pacotes
Neste projeto utilizaremos a tríade **mocha sinon chai** para implementar os testes unitários. É importante que todas as lib abaixo estejam corretamente instaladas no projeto como **dev-dependencies**, para que não ocorram falhas de intelissense ou de compilação:
-   mocha
-   sinon    
-   chai    
-   sinon-chai    
-   chai-as-promised    
-   ts-node    
-   tslint-no-unused-expression-chai    
-   tslint-config-airbnb-base    
-   nyc    
-   strict-mocha-describers
-   typescript    
-   @types/mocha    
-   @types/sinon    
-   @types/chai    
-   @types/sinon-chai    
-   @types/chai-as-promised    
-   @types/node

Script para instalação:
> npm i --save-dev mocha sinon chai sinon-chai chai-as-promised strict-mocha-describers ts-node tslint-no-unused-expression-chai tslint-config-airbnb-base nyc @types/mocha @types/sinon @types/chai @types/sinon-chai @types/chai-as-promised typescript @types/node

### Criação do setup.spec.ts
Este arquivo tem como objetivo realizar toda a configuração inicial dos testes.

### Criação do mocharc.json
Este arquivo tem como objetivo realizar toda a configuração inicial do mocha e a chamada do arquivo de configuração **setup.spec.ts**.

### Criação do .nycrc.json
Este arquivo tem como objetivo realizar toda a configuração inicial dos nyc coverage para o mocha.

### Configurando package.json

No arquivo package.json dentro de scripts é necessário realizar as seguintes configurações:
> "test": "mocha"
> "test:coverage": "nyc npm test"

### Configurando tsconfig.base.json
No arquivo tsconfig.base.json dentro do array types é necessário adicionar as seguintes configurações:
> "node",
> "mocha"

### Configurando launch.json
No arquivo launch.json é necessário adicionar as seguintes configurações de teste:

    {
    "type": "node",
    "request": "launch",
    "name": "Mocha Tests",
    "skipFiles": [
    "<node_internals>/**"
    ],
    "cwd": "${workspaceRoot}",
    "args": [
    "${workspaceRoot}/node_modules/mocha/bin/_mocha",
    "--timeout",
    "999999"
    ],
    "outputCapture": "std"
    }
