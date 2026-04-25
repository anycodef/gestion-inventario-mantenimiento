# Estrategia de Versionamiento y Ramas

Este documento define la estrategia oficial para el control de versiones del código fuente del sistema de gestión de inventarios, de acuerdo a las directrices de Gestión de Configuración. La adopción de este flujo de trabajo permite mantener el historial del proyecto de forma ordenada, habilitar el trabajo en paralelo y asegurar la estabilidad en ambientes productivos.

## 1. Modelo de Ramas (Branching Strategy)

Se ha adoptado el flujo de trabajo **GitFlow**, el cual se basa en el uso de dos ramas principales persistentes y múltiples ramas de apoyo de vida corta.

### 1.1. Ramas Principales (Long-Lived Branches)

*   **`main` (o `master`)**:
    *   **Propósito:** Contiene el código en estado de producción. Cualquier commit en esta rama debe ser un lanzamiento (release) estable y completamente probado.
    *   **Reglas de Protección:**
        *   **NO** se permiten *commits* directos (push directos deshabilitados).
        *   Solo acepta fusiones (merges) a través de Pull Requests (PR) desde la rama `release` o `hotfix`.
        *   Requiere al menos 2 aprobaciones (code reviews) antes de hacer merge.
        *   Los pipelines de Integración Continua (CI) deben pasar exitosamente.
        *   No se permite reescribir el historial (`force push` deshabilitado).
    *   **Versionamiento:** Cada fusión hacia `main` debe ser etiquetada (Tag) siguiendo SemVer (Versionamiento Semántico).

*   **`develop`**:
    *   **Propósito:** Rama de integración principal donde convergen todas las nuevas características (features) en desarrollo. Refleja el estado del próximo lanzamiento.
    *   **Reglas de Protección:**
        *   **NO** se permiten *commits* directos.
        *   Solo acepta fusiones a través de Pull Requests desde ramas `feature`, `bugfix` o `hotfix`.
        *   Requiere al menos 1 aprobación (code review).
        *   Requiere que los pipelines de CI (linter, tests unitarios) pasen correctamente.
        *   `force push` deshabilitado.

### 1.2. Ramas de Apoyo (Short-Lived Branches)

Las ramas de apoyo deben crearse a partir de una rama base específica y deben eliminarse una vez que se hayan fusionado.

*   **Ramas de Característica (`feature/*`)**:
    *   **Se ramifica de:** `develop`
    *   **Se fusiona hacia:** `develop`
    *   **Nomenclatura:** `feature/[CLAVE_PROYECTO]-numero-ticket-descripcion-corta` (Ej. `feature/SYS-101-crud-productos`)
    *   **Propósito:** Desarrollo de nuevas funcionalidades o mejoras.

*   **Ramas de Lanzamiento (`release/*`)**:
    *   **Se ramifica de:** `develop`
    *   **Se fusiona hacia:** `main` y `develop`
    *   **Nomenclatura:** `release/vX.Y.Z` (Ej. `release/v1.2.0`)
    *   **Propósito:** Preparación y estabilización de un nuevo lanzamiento a producción. Permite corrección de errores menores, pero no nuevas características.

*   **Ramas de Corrección Urgente (`hotfix/*`)**:
    *   **Se ramifica de:** `main`
    *   **Se fusiona hacia:** `main` y `develop`
    *   **Nomenclatura:** `hotfix/[CLAVE_PROYECTO]-numero-ticket-descripcion` (Ej. `hotfix/SYS-202-fix-login-crash`)
    *   **Propósito:** Resolver errores críticos en producción inmediatamente, sin esperar al próximo ciclo de release.

*   **Ramas de Corrección de Errores (`bugfix/*`)**:
    *   **Se ramifica de:** `develop`
    *   **Se fusiona hacia:** `develop`
    *   **Nomenclatura:** `bugfix/[CLAVE_PROYECTO]-numero-ticket-descripcion`
    *   **Propósito:** Resolución de errores no críticos encontrados en entornos de pruebas o durante el desarrollo normal.

## 2. Convención de Versionamiento Semántico (SemVer)

El sistema empleará el estándar de Versionamiento Semántico (SemVer 2.0.0) para las etiquetas de lanzamiento (`tags`) en la rama `main`.

Formato: `vMAJOR.MINOR.PATCH` (Ejemplo: `v1.4.2`)

*   **MAJOR (Mayor):** Cambios incompatibles en la API o arquitectura, grandes refactorizaciones o hitos funcionales significativos.
*   **MINOR (Menor):** Se añade funcionalidad de manera retrocompatible.
*   **PATCH (Parche):** Correcciones de errores retrocompatibles.

## 3. Consideraciones de Auditoría

Toda la estrategia de versionamiento y control de ramas ha sido diseñada tomando en consideración principios de separación de funciones (SoD) y rastreabilidad requeridos en marcos de cumplimiento como ISO/IEC 27001. La prohibición de *commits* directos en las ramas `main` y `develop` fuerza la revisión por pares, mitigando el riesgo de inyección de código malicioso o defectuoso.