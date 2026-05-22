# Informe de Línea Base del Sistema (LB-01)

Este documento establece la **Línea Base Inicial (LB-01)** del Sistema de Gestión de Inventarios. Representa una instantánea controlada y auditada de todos los elementos de configuración (Software Configuration Items - SCIs) en el repositorio al momento de su establecimiento.

Cualquier modificación posterior a los elementos aquí listados debe seguir estrictamente el Protocolo de Control de Cambios.

## 1. Información General

*   **Identificador de Línea Base:** LB-01
*   **Fecha de Establecimiento:** (Al momento del último commit previo a esta documentación)
*   **Propósito:** Establecer el estado inicial conocido del código fuente, arquitectura y configuración antes de iniciar nuevos desarrollos o mantenimientos estructurados.
*   **Marco de Referencia Documental:** SWEBOK v4, ISO/IEC 12207, ISO 10007.

## 2. Inventario de Componentes y Entorno Tecnológico

El sistema sigue una arquitectura Cliente-Servidor (Frontend y Backend separados).

### 2.1. Entorno de Ejecución Base
*   **Runtime:** Node.js (v22.x o superior)
*   **Gestor de Paquetes:** npm (v11.x o superior)

### 2.2. Componente: Frontend (Aplicación Cliente)

*   **Ruta Base:** `/frontend/`
*   **Tecnologías Principales:** React, Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui (Radix UI).
*   **Archivos de Configuración Críticos (SCIs):**
    *   `package.json` y `package-lock.json`: Definición de dependencias y scripts.
    *   `tsconfig.json`: Configuración del compilador de TypeScript.
    *   `next.config.ts`: Configuración del framework Next.js.
    *   `tailwind.config.ts` y `postcss.config.mjs`: Configuración de estilos y procesado CSS.
    *   `components.json`: Configuración de componentes de interfaz (shadcn/ui).
    *   `.eslintrc.json`: Reglas de análisis estático (linter).
*   **Estructura de Código Fuente (`/frontend/src/`):** Contiene la lógica de la interfaz de usuario, componentes de React y rutas de la aplicación.

### 2.3. Componente: Backend (API RESTful)

*   **Ruta Base:** `/backend/`
*   **Arquitectura:** Clean Architecture (Capas: Dominio, Aplicación, Interfaces, Infraestructura).
*   **Tecnologías Principales:** Node.js, Express, TypeScript, Base de Datos Relacional (MySQL/PostgreSQL según configuración).
*   **Archivos de Configuración Críticos (SCIs):**
    *   `package.json` y `package-lock.json`: Definición de dependencias y scripts de inicialización.
    *   `tsconfig.json`: Configuración del compilador de TypeScript.
*   **Estructura de Código Fuente (`/backend/src/`):** Contiene la lógica de negocio, endpoints de la API, conexión a base de datos y modelos.

### 2.4. Componente: Documentación del Sistema

*   **Ruta Base:** `/docs/`
*   **Estado:** Re-documentado mediante ingeniería inversa (SWEBOK v4).
*   **Sub-componentes (SCIs):**
    *   `01_Requirements/`: Requisitos Funcionales y No Funcionales.
    *   `02_Architecture/`: Descripción de la Arquitectura, Decisiones Arquitectónicas (ADRs), Vistas.
    *   `03_Design/`: Diseño Estructural y de Comportamiento.
    *   `04_Operations_and_Maintenance/`: Guías de Instalación y Mantenimiento.
    *   `05_Configuration_Management/`: (Añadido en esta iteración) Gestión de la configuración y cambios.

## 3. Conformidad y Aprobación

Los elementos descritos en este inventario han sido verificados mediante análisis estático de los directorios del repositorio principal. A partir de la aprobación de este documento, la Línea Base LB-01 queda establecida como el punto de partida oficial para auditorías de configuración.