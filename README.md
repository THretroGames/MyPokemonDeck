# MyPokemonDeck

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Olá,

Sobre o projeto:

Primeiro gostaria de expressar que achei muito divertido e inteligente o teste, e que adorei a temática :)

Como o projeto deve ser apenas em memória, não usei local storage e usei o padrão singleton na injeção de dependência do serviço de Deck.
Também não usei route e usei máquina de estado para navegar entre os componentes que formam o sistema.

Eu foquei mais na funcionalidade do app e entregar o que é pedido no teste dentro de um prazo válido, tendo dito isto, existem alguns pontos de melhoria e refactoring.
Um deles é na edição de Deck que poderia ser feito em um Deck temporário e dará opção de cancelar a edição.
Outro ponto de melhoria é no layout e web design no app.
Também usar quantidade da mesma carta ao invés de exibir as cópias.
Refactoring para colocar algumas seções de componentes em outro componente para evitar DRY.

Um exemplo ótimo de Deck Builder que eu gosto muito é do Magic Arena, seria bem legal tentar replicar o mesmo layout e processo feito em Unity usando Angular, seria bem desafiador, mas muito interessante.

IDE utilizada: VSCode

Tempo levado para finalizar o projeto: 18 horas.

Muito obrigado pela oportunidade e adoraria ouvir um feedback sobre o projeto :)
