# ACT LMS Frontend - Angular Application

Frontend do Sistema de Gerenciamento de Aprendizado (LMS) desenvolvido para a ACT (Associação de Ciência e Tecnologia).

## 🚨 Atenção

- **Usuário Administrador padrão**: `admin@exemplo.com` / `123` (já que penas estudantes podem se inscrever** nos cursos através do sistema)

## 📋 Informações do Projeto

- **Framework**: Angular 19.0.0
- **Node.js**: Versão compatível com Angular 19
- **UI Framework**: Bootstrap 5.3.8
- **TypeScript**: 5.7.2
- **Angular CLI**: 19.0.0

## 🚀 Configuração e Execução

### Pré-requisitos

- Node.js instalado (versão compatível com Angular 19)
- npm ou yarn instalado

### Instalação

Instale as dependências:

```bash
npm install
```

### Execução

#### Modo Desenvolvimento

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200/` e será recarregada automaticamente quando você modificar os arquivos.

## 🎨 Tecnologias e Bibliotecas

### Core

- **Angular 19**: Framework principal
- **TypeScript 5.7.2**: Linguagem de programação
- **RxJS 7.8.0**: Programação reativa

### UI/UX

- **Bootstrap 5.3.8**: Framework CSS para interface
- **Angular Forms**: Gerenciamento de formulários
- **Angular Router**: Roteamento da aplicação

### Desenvolvimento

- **Angular CLI 19**: Ferramentas de linha de comando
- **Angular Build**: Sistema de build
- **Prettier**: Formatação de código

## 📁 Estrutura do Projeto

```
act-lms-frontend/
├── src/
│   ├── app/                   # Código da aplicação
│   │   ├── components/        # Componentes Angular
│   │   ├── services/          # Serviços Angular
│   │   ├── models/            # Interfaces e modelos TypeScript
│   │   └── app.component.*    # Componente raiz
│   ├── assets/                # Recursos estáticos
│   ├── environments/          # Configurações de ambiente
│   └── styles/                # Estilos globais
├── docs/                      # Documentação (ADRs)
├── public/                    # Arquivos públicos
├── angular.json               # Configuração do Angular CLI
├── package.json               # Dependências e scripts
└── tsconfig.json              # Configuração do TypeScript
```

## 🔗 Integração com Backend

O frontend consome a API REST do backend Java Spring Boot que deve estar rodando em `http://localhost:8080`.

## 📚 Architecture Decision Records (ADRs)

Este projeto utiliza ADRs para documentar decisões arquiteturais importantes tomadas durante o desenvolvimento.

### Índice de ADRs

| ADR                                                    | Título                                               | Status | Data          |
|--------------------------------------------------------|------------------------------------------------------|--------|---------------|
| [ADR-001](./docs/adr-001-bootstrap-native-decision.md) | Decisão de usar Bootstrap nativo ao invés de PrimeNG | Aceito | Setembro 2025 |
