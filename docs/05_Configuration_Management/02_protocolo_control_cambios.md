# Protocolo de Control de Cambios

Este documento establece el procedimiento formal para la gestión, revisión y aprobación de todos los cambios realizados en el código fuente del sistema. Su objetivo es garantizar la trazabilidad, la calidad del software y el cumplimiento normativo.

## 1. Convenciones de Commits (Conventional Commits)

Todos los mensajes de *commit* deben adherirse estrictamente a la especificación de **Conventional Commits**. Esta convención facilita la generación automática de notas de lanzamiento (*changelogs*) y mejora la legibilidad del historial. Adicionalmente, todos los *commits* deben incluir la referencia al identificador del ticket o tarea en Jira.

### Estructura del Mensaje

```text
<tipo>[ámbito opcional]: <descripción> ([ID-JIRA])

[cuerpo opcional]

[pie(s) opcional(es)]
```

### Tipos Permitidos

*   `feat`: Una nueva característica.
*   `fix`: Una corrección de un error (bug).
*   `docs`: Cambios únicamente en la documentación.
*   `style`: Cambios que no afectan el significado del código (espacios en blanco, formato, falta de punto y coma, etc.).
*   `refactor`: Un cambio en el código que no corrige un error ni añade una característica.
*   `perf`: Un cambio en el código que mejora el rendimiento.
*   `test`: Añadir pruebas faltantes o corregir pruebas existentes.
*   `build`: Cambios que afectan el sistema de compilación o dependencias externas (ej. npm, maven).
*   `ci`: Cambios en nuestros archivos y scripts de configuración de CI (ej. GitHub Actions, GitLab CI).
*   `chore`: Otras tareas misceláneas que no modifican el código fuente ni las pruebas (ej. actualización de dependencias menores).
*   `revert`: Revierte un commit anterior.

### Ejemplos

*   **Característica:** `feat(auth): implementar inicio de sesión con JWT (SYS-45)`
*   **Corrección:** `fix(ui): corregir desbordamiento del botón de guardar en móviles (SYS-89)`
*   **Documentación:** `docs(api): actualizar endpoints de inventario en OpenAPI (SYS-112)`
*   **Refactorización:** `refactor(db): optimizar consultas al Kardex (SYS-56)`

## 2. Flujo de Aprobación de Pull Requests (PR)

Para fusionar código hacia ramas protegidas (`develop`, `main`), se debe seguir obligatoriamente el siguiente flujo mediante *Pull Requests*:

1.  **Creación del PR:**
    *   El desarrollador abre un PR desde su rama de trabajo hacia la rama objetivo (ej. de `feature/SYS-45-login` hacia `develop`).
    *   La descripción del PR debe incluir el contexto del cambio, referencias a tickets (ej. "Cierra SYS-45"), y pasos para probar la funcionalidad si aplica.
2.  **Ejecución de CI/CD Automático:**
    *   Al abrir el PR, el sistema de Integración Continua (CI) se disparará automáticamente.
    *   Se ejecutarán análisis estático (Linters, SAST), pruebas unitarias y de integración.
    *   **Condición estricta:** Todos los *checks* de CI deben estar en estado "Pasó" (verde) para continuar.
3.  **Revisión de Código (Code Review):**
    *   Se requiere la revisión y aprobación explícita de al menos uno (para `develop`) o dos (para `main`) revisores autorizados (desarrolladores senior, líderes técnicos o arquitectos).
    *   Los revisores evaluarán la calidad del código, el cumplimiento de la arquitectura y la cobertura de pruebas.
4.  **Resolución de Comentarios:**
    *   Si hay observaciones, el autor debe realizar los ajustes mediante nuevos *commits* en la misma rama.
    *   Una vez aplicados los cambios, los revisores deben re-evaluar y otorgar su aprobación.
5.  **Fusión (Merge):**
    *   Una vez aprobada y con los *checks* en verde, el autor (o el líder técnico) puede realizar la fusión (merge) hacia la rama objetivo.
    *   Se prefiere la estrategia `Squash and Merge` para mantener un historial lineal y limpio en la rama objetivo, o `Merge commit` para preservar la estructura de la rama originaria, según defina el líder técnico.
6.  **Eliminación de Rama:**
    *   La rama de origen debe ser eliminada tras la fusión exitosa.

## 3. Cumplimiento y Auditoría

Este protocolo está diseñado en alineación con normativas internacionales:

*   **ISO 10007 (Gestión de la Configuración):** Establece el proceso documentado para la identificación, control, estado y auditoría de los elementos de configuración (código fuente).
*   **ISO/IEC 27001 (Seguridad de la Información):** Cumple con los controles de gestión de cambios (Control 12.1.2) asegurando que todos los cambios al sistema estén documentados, probados, revisados y aprobados por un tercero independiente antes de su promoción a producción, mitigando así riesgos de seguridad e interrupción del servicio.