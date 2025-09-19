# ADR-001: Bootstrap nativo ao invés de PrimeNG

## Status
Aceito

## Contexto
No desenvolvimento do ACT LMS, precisávamos escolher uma biblioteca de componentes UI. O PrimeNG apresentou dificuldades de implementação e compatibilidade, não atendendo às expectativas.

## Decisão
Usar **Bootstrap nativo (5.3.8)** sem bibliotecas de componentes adicionais, mantendo controle total sobre a implementação.

## Alternativas consideradas
- **PrimeNG**: Rejeitado por dificuldades de implementação e compatibilidade
- **ng-bootstrap**: Descartado por adicionar dependência desnecessária

## Consequências

### Positivas
- Controle total sobre componentes e customizações
- Menor bundle size e melhor performance
- Código mais transparente e maintível
- Interface consistente garantida

### Negativas
- Mais tempo para implementar componentes complexos
- Necessidade de estabelecer padrões internos

## Implementação
Bootstrap 5.3.8 via classes CSS diretas, componentes Angular customizados conforme demanda.

---
*Setembro[]() 2025 - Equipe ACT LMS*
