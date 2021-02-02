# Bolierplate Node.js

Olá! Este projeto tem como propósito trazer um boilerplate que serve como base para novas aplicações, adotando padrões de projeto e arquitetura que ajudam na manutenção e escalabilidade das aplicações. 


## Estrutura do Projeto

Este projeto foi estruturado realizando a separação em 3 pastas, sendo elas: 

**Entrypoint**
> Conhecida como Presentation ou Application, essa pasta deve conter os bootstrap de **exposição externa da aplicação**, independente do tipo, sejam elas CLI, Stream, HTTP, handle (lambda), de modo que ela deve conter seus próprios controllers de delegação para as classes de Domain, para resolução dos comandos ou rotas a serem resolvidos, **de modo que a forma de exposição seja uma camada que não influência nas regras de negócios e abstrações**, para que quaisquer mudanças de disponibilização de informação na camada de apresentação, não afete a regra de negócio que se encontra isolada no core de resolução do sistema.

**Core**
> A pasta Core contempla o DOMAIN de nossa aplicação, que tem como objetivo facilitar o desenvolvimento e entendimento de regras e processos complexos de nosso negócio, adotando as boas práticas do DDD (Domain Driven Design). Além disto a pasta Core contempla o APPLICATION, que viabiliza o tratamento de validators atrelados ao DOMAIN e comuns a diferentes camadas de apresentação, tratamento de exceções atreladas ao negócio, dentre outros.  

**Infraestructure**
> A camada de Infraestrutura tem o objetivo de isolar todo recurso externo ao domínio de negócio que entende-se como componentes de infra estrutura ou de serviço, que tenham comunicação externa ao core da aplicação; entende-se como recurso externo, APIs e serviços, Banco de dados, Sistemas de fila e mensagem, Repositórios de consumo de dados do banco de dados (abstração conceitual de exposição dos dados), assim como comunicação com o SO, taís como escrita e leitura de arquivos, etc.


## Testes Unitários

Neste projeto foi utilizado a tríade **mocha sinon chai** para implementar os testes unitários. O detalhamento de cada arquivo e instalação foi descrito em ./test/readme.md.
Para rodar os testes da aplicação é necessário executar:
> npm run test:coverage


## Configurações

Segue lista de variáveis de ambiente utilizadas:
 > **PORT**: Porta que a aplicação deve ser disponibilizada (Porta default: 3000);
 
 > **REDIS_URL**: Endereço do Redis utilizado como exemplo para persistir Sample Entity;
 
 > **REDIS_PASSWORD**: Senha do Redis quando houver.

## Instruções para Execução do Projeto

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.

```
npm install
```
```
docker-compose up
```


## Como acessar a aplicação

O objetivo desta aplicação é viabilizar via endpoint a inclusão, consulta geral e específica de "Samples" cadastrados. Segue abaixo detalhamento dos endpoint:

URL da Aplicação: http://localhost:3008

> **GET** /health-check
> Consulta da saude do serviço
```
{ "ok": true }
```
<br>

> **GET** /sample
> Consulta todos os Samples cadastrados
```
Response:
[
	{
		"id": "2beb79be-5c39-4539-b14b-9a60daf114ce",
		"name": "Teste Sample 01"
	},
	{
		"id": "6a9dd6e0-8f91-400e-908a-96a601601090",
		"name": "Teste Sample 02"
	}
]
```

<br>

> **GET** /sample/:id
> Consulta Sample cadastrado através do ID retornado no POST
```
Response:
{
	"id": "84a6198a-70c3-4b1e-9d00-06b1df4e57c9",
	"name": "Teste Sample 01"
}
```

<br>

> **POST** /sample
> Inserir novo Sample no cadastro
```
Request Body:
{
	"name": "Teste Sample 01"
}
``` 
  


