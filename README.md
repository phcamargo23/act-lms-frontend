# ACT LMS - Learning Management System

Sistema de gerenciamento de aprendizado desenvolvido com Angular (frontend) e Java Spring Boot (backend).

Este projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) versão 20.3.1.

## Architecture Decision Records (ADRs)

Este projeto utiliza ADRs para documentar decisões arquiteturais importantes tomadas durante o desenvolvimento.

### Índice de ADRs

| ADR | Título | Status | Data          |
|-----|--------|--------|---------------|
| [ADR-001](./docs/adr-001-bootstrap-native-decision.md) | Decisão de usar Bootstrap nativo ao invés de PrimeNG | Aceito | Setembro 2025 |

## Desenvolvimento

### Frontend (Angular)

#### Servidor de Desenvolvimento
Para iniciar o servidor de desenvolvimento local:

```bash
cd act-lms-frontend
npm install
ng serve
```

Uma vez que o servidor estiver rodando, abra seu navegador e navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer arquivo de origem.

#### Geração de Código
O Angular CLI inclui ferramentas poderosas de geração de código. Para gerar um novo componente:

```bash
ng generate component component-name
```

Para uma lista completa de schematics disponíveis (como `components`, `directives`, ou `pipes`):

```bash
ng generate --help
```

#### Build
Para fazer o build do projeto:

```bash
ng build
```

Isso compilará seu projeto e armazenará os artefatos de build no diretório `dist/`. Por padrão, o build de produção otimiza sua aplicação para performance e velocidade.

#### Testes Unitários
Para executar testes unitários com o test runner [Karma](https://karma-runner.github.io):

```bash
ng test
```

#### Testes End-to-End
Para testes end-to-end (e2e):

```bash
ng e2e
```

O Angular CLI não vem com um framework de teste end-to-end por padrão. Você pode escolher um que atenda às suas necessidades.

### Backend (Java Spring Boot)
```bash
cd act-lms-backend
mvn spring-boot:run
```

## Tecnologias

- **Frontend**: Angular 19, Bootstrap 5.3.8
- **Backend**: Java Spring Boot
- **Banco de Dados**: (a definir)

## Recursos Adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## Como Contribuir

1. Para cada decisão arquitetural importante, crie um novo ADR seguindo o template padrão
2. Atualize este índice com o novo ADR
3. Mantenha os ADRs organizados na pasta `docs/`
