# Requisitos No Funcionales

Basados en la tecnología observada en el repositorio (`Node.js`, `Express`, `TypeScript`, `MySQL/PostgreSQL`, `Next.js`, `TailwindCSS`), se infieren los siguientes requisitos no funcionales y restricciones del sistema.

## 1. Restricciones Tecnológicas
- **NFR1.1 Lenguaje Principal:** Todo el código del cliente y servidor debe estar escrito utilizando TypeScript (tipado estricto) para mayor confiabilidad y robustez.
- **NFR1.2 Entorno Backend:** El servidor operará utilizando Node.js y el framework Express.
- **NFR1.3 Entorno Frontend:** La interfaz de usuario estará construida en React utilizando el framework Next.js (App Router) y estilizada con Tailwind CSS y componentes de `shadcn/ui` (Radix UI).
- **NFR1.4 Base de Datos:** El sistema debe ser agnóstico a la base de datos subyacente a nivel de dominio, soportando actualmente tanto bases de datos relacionales MySQL como PostgreSQL a través de diferentes implementaciones de repositorios.

## 2. Calidad del Código y Arquitectura
- **NFR2.1 Arquitectura Limpia:** El backend debe seguir estrictamente los principios de "Clean Architecture", manteniendo las capas de Dominio, Aplicación, Infraestructura e Interfaces separadas.
- **NFR2.2 Patrones de Diseño:** El acceso a la base de datos debe implementarse obligatoriamente mediante el patrón Repository para desacoplar la lógica de base de datos de la lógica de negocio.

## 3. Rendimiento (Inferido)
- **NFR3.1 Tiempo de Respuesta Frontend:** Al usar Next.js, el sistema debe aprovechar las características de Server-Side Rendering (SSR) o Static Site Generation (SSG) cuando sea apropiado para optimizar el rendimiento visual percibido.

## 4. Mantenibilidad
- **NFR4.1 Modularidad:** El código frontend utilizará componentes reutilizables (ubicados en `/components`) y hooks personalizados (`/hooks`) para garantizar el encapsulamiento y reusabilidad del código.
- **NFR4.2 Validaciones:** La integridad de los datos de entrada en el cliente debe validarse rigurosamente utilizando esquemas (ej. `Zod` o similar, según dependencias del frontend).