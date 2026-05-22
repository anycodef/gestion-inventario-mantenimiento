# Registro de Decisiones Arquitectónicas (ADRs)

Este documento registra las decisiones de diseño fundamentales que rigen la estructura y el comportamiento del sistema.

## ADR 01: Uso de Clean Architecture en el Backend
**Contexto:** El backend requiere gestionar procesos complejos de inventario y compras, los cuales pueden evolucionar con el tiempo.
**Decisión:** Se implementa "Clean Architecture", dividiendo el proyecto en capas estandarizadas (`domain`, `application`, `interfaces`, `infrastructure`).
**Justificación (Rationale):** Desacopla la lógica central de negocio de los detalles técnicos como la base de datos o el framework web (Express). Esto minimiza el riesgo al actualizar tecnologías, facilita las pruebas unitarias y centraliza las reglas de negocio.
**Consecuencias:** Requiere escribir más código repetitivo (ej. mapeos entre capas) a corto plazo, pero reduce drásticamente el costo de mantenimiento a largo plazo.

## ADR 02: Implementación del Patrón Repository
**Contexto:** Necesitamos leer y escribir datos de entidades (Productos, Kardex, etc.) en bases de datos relacionales sin acoplar la lógica de negocio a un motor SQL específico.
**Decisión:** Las capas superiores dependerán de interfaces de repositorios (`IRepository`), que se implementan en la capa de `infrastructure` (ej. `MySQLProductoRepository`, `PostgreSQLProductoRepository`).
**Justificación (Rationale):** Se adhiere al Principio de Inversión de Dependencia (DIP) de SOLID. Permite cambiar o soportar múltiples bases de datos sin reescribir los Casos de Uso.

## ADR 03: Adopción de Next.js (App Router) y Tailwind CSS para Frontend
**Contexto:** Se necesita una interfaz robusta, rápida de desarrollar y con buen rendimiento.
**Decisión:** Utilizar React con Next.js como framework subyacente, y Tailwind CSS para los estilos.
**Justificación (Rationale):** Next.js proporciona enrutamiento basado en archivos, renderizado híbrido y optimizaciones listas para usar, mientras que Tailwind agiliza el diseño UI mediante clases utilitarias en lugar de hojas de estilo aisladas.

## ADR 04: Comunicación Cliente-Servidor mediante API REST
**Contexto:** El Frontend necesita consumir los servicios del Backend.
**Decisión:** Usar peticiones HTTP estandarizadas siguiendo principios RESTful y bibliotecas de cliente como `axios`.
**Justificación (Rationale):** Es el estándar más adoptado y fácil de depurar para aplicaciones web basadas en React.