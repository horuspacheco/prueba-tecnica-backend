# Arquitectura del Sistema

Este documento describe la arquitectura general del sistema de gestión de pagos manuales basado en microservicios.

## Diagrama General

```mermaid
graph TD
  AG[API Gateway (Express.js)] -- REST --> PS[Payment Service (NestJS)]
  AG -- REST --> NS[Notification Service (NestJS)]
  PS -- DB --> PG[(PostgreSQL)]
  NS -- DB --> PG
```

## Decisiones de Diseño
- Separación de responsabilidades por microservicio.
- Comunicación REST entre gateway y servicios.
- PostgreSQL como base de datos centralizada.

## Escalabilidad
- Desplegar múltiples instancias de cada servicio.
- Uso de balanceadores de carga.
- Separar bases de datos por servicio si es necesario.

## Estrategia de Comunicación
- REST para simplicidad y trazabilidad.
- Event-driven (bonus) para notificaciones desacopladas.
