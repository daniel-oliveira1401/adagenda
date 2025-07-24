# ADAgenda

Projeto de Agenda de Contatos para o trabalho em grupo da ADA.

## Branch principal

A branch principal do projeto (onde todo o trabalho coletivo dos integrantes deve estar contido ao final do projeto) é a:

```
develop
```

## Partes integrantes:

* Cadastro de contatos (nome, telefone, e-mail)
* Edição e exclusão de contatos
* Busca por nome
* Lista de contatos ordenada


### Coisas para fazer:

* Serviço de persistência utilizando LocalStorage
* Componente de inclusão de Contato (nome, telefone, e-mail)
    *   Utilizar uma tela de inclusão de contato
* Edição de contato
    *   Utilizar uma tela atualização de contato (possivelmente reutilizando o componente da tela de inclusão de contato)
* Exclusão de contato (pode utilizar um alerta para confirmar a remoção)
* Listagem de contatos. Deve conter as informações básicas do contato. A listagem deve suportar alguma forma de definir a ordenação dos items
* Busca por nome (filtragem dos dados):
    * O que for digitado no filtro deve ser utilizado para esconder os itens que não contiverem aquele texto no nome (somente busca no nome)


### Padrões


#### Nomeclatura

Sempre usar o sufixo que representa o que aquele artefato do projeto representa, como por exemplo: Service, Pipe, Model, Component.

Todos os componentes devem possuir a palavra "Component" como sufixo. 
Exemplo: 
```
ContatoComponent
```


#### Estilo

No arquivo style.scss estão localizadas as definições padrões que devem ser utilizadas como base para estilização dos componentes do projeto.

#### Estrutura do projeto

A estrutura de pastas do projeto segue a arquitetura padrão da empresa. Os módulos dentro da pasta features devem ser por domínio da aplicação. Nossa aplicação tem apenas um domínio (contatos), portanto todo o desenvolvimento dos componentes deve ser feito dentro da pasta features/contatos/

Estrutura de referência do projeto:

```
/contatos
    /components
        /lista-contatos
        /form-contato
        /contato
    contatos.ts
    contatos.html
    contatos.module.ts
    contatos.routing.ts
```