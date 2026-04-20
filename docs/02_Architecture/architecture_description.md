# Descripción de la Arquitectura (Architecture Description)

El sistema presenta una arquitectura estándar Cliente-Servidor (Client-Server), donde el frontend y el backend operan como aplicaciones separadas y se comunican a través de una API RESTful.

## 1. Visión General
- **Frontend (Cliente):** Una aplicación web moderna construida con React y Next.js. Provee la interfaz de usuario para interactuar con las funcionalidades de inventario, compras y ventas.
- **Backend (Servidor):** Una API construida en Node.js utilizando Express. Implementa la lógica de negocio y persiste el estado del sistema en la base de datos. Está diseñado usando los principios de la Arquitectura Limpia (Clean Architecture).
- **Base de Datos:** Un servidor de base de datos relacional. El sistema es flexible y soporta implementaciones conectadas tanto a MySQL como a PostgreSQL a través de diferentes implementaciones concretas del patrón Repositorio.

## 2. Metas Arquitectónicas
- **Desacoplamiento:** Aislar la lógica de dominio puro de las preocupaciones de la infraestructura (como la base de datos o la entrega web).
- **Testabilidad:** Permitir probar los casos de uso sin depender de servicios externos como la base de datos o los frameworks web.
- **Mantenibilidad:** Garantizar que los cambios en un lado del sistema (ej. cambiar la base de datos) no impacten a la lógica de negocio o al modelo de dominio.