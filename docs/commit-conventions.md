# Commit Conventions y Control de Cambios

## 1. Estándar Adoptado

Este proyecto usa **Conventional Commits 1.0.0** como base, extendido con la clave de ticket de **Jira** en el subject. Este estándar es totalmente compatible con el flujo **Trunk-Based Development** y habilita:

- Generación automática de CHANGELOGs.
- Determinación automática del bump de versión SemVer.
- Vinculación directa entre commits y tickets de Jira.
- Trazabilidad de cambios por módulo, tipo y colaborador.

---

## 2. Formato de Commit

### 2.1 Estructura completa

```
<tipo>(<scope>): <JIRA-KEY> <descripcion>

[cuerpo opcional]

[pie opcional — breaking changes, smart commits Jira]
```

### 2.2 Subject line (obligatorio)

```
<tipo>(<scope>): <JIRA-KEY> <descripcion>
```

| Campo          | Reglas                                                                                   |
|----------------|------------------------------------------------------------------------------------------|
| `tipo`         | Minúsculas. Ver tabla de tipos en §3.                                                    |
| `scope`        | Minúsculas, entre paréntesis. Opcional pero recomendado. Ver scopes en §4.               |
| `JIRA-KEY`     | Clave del ticket (`GIM-XXX`). Obligatorio para trabajo relacionado con un ticket.        |
| `descripcion`  | Imperativo presente, sin punto final, máximo 72 caracteres contando todo el subject.     |

**Ejemplos válidos:**
```
feat(inventario): GIM-101 add product stock management endpoint
fix(auth): GIM-87 resolve JWT token expiration not refreshing
chore(deps): GIM-55 migrate npm to pnpm workspace
docs(arch): GIM-34 add OpenAPI specification for inventory module
refactor(db): GIM-78 extract repository base class
test(compras): GIM-99 add unit tests for orden compra use case
ci: GIM-120 add Docker build stage to pipeline
```

**Sin ticket (tareas técnicas internas sin ticket Jira):**
```
chore: update .gitignore
docs: fix typo in README
style(ui): apply prettier formatting
```

---

## 3. Tipos de Commit

| Tipo       | Cuándo usar                                                              | Impacto SemVer |
|------------|--------------------------------------------------------------------------|----------------|
| `feat`     | Nueva funcionalidad o mejora perceptible por el usuario/API              | MINOR          |
| `fix`      | Corrección de un bug                                                     | PATCH          |
| `chore`    | Tareas de mantenimiento, dependencias, build, CI/CD. Sin lógica de negocio | —            |
| `docs`     | Solo documentación (md, comentarios, README)                             | —              |
| `refactor` | Cambio de código sin añadir funcionalidad ni corregir bug                | —              |
| `test`     | Adición o modificación de tests únicamente                               | —              |
| `ci`       | Cambios en pipelines, workflows de CI/CD                                 | —              |
| `perf`     | Mejora de rendimiento sin cambio funcional                               | PATCH          |
| `style`    | Formato, espaciado, punto y coma. Sin cambio de lógica                   | —              |
| `revert`   | Reversión de un commit anterior                                          | depende        |
| `build`    | Cambios en el sistema de build o dependencias externas                   | —              |

### Breaking Changes

Si el commit introduce un cambio que rompe compatibilidad, se indica con `!` después del tipo/scope **y** se documenta en el pie con `BREAKING CHANGE:`:

```
feat(api)!: GIM-200 remove deprecated /productos/list endpoint

BREAKING CHANGE: el endpoint /productos/list fue eliminado.
Usar /productos con query params para filtrado.
```

Esto genera un bump de versión MAJOR.

---

## 4. Scopes del Proyecto

Los scopes representan módulos o capas del sistema:

| Scope           | Área de responsabilidad                                      |
|-----------------|--------------------------------------------------------------|
| `inventario`    | Módulo de gestión de productos y stock                       |
| `compras`       | Orden de compra, recepción, detalle compra                   |
| `proveedores`   | Gestión de proveedores                                       |
| `mantenimiento` | Módulo de mantenimiento de equipos                           |
| `auth`          | Autenticación y autorización                                 |
| `db`            | Capa de acceso a datos, repositorios, migraciones            |
| `api`           | Rutas, controladores, middleware del backend                 |
| `ui`            | Componentes, páginas y lógica del frontend                   |
| `infra`         | Docker, docker-compose, configuración de infraestructura     |
| `config`        | Variables de entorno, configuración de la aplicación         |
| `deps`          | Dependencias (package.json, pnpm, lockfiles)                 |
| `dev`           | Herramientas de desarrollo (ESLint, Prettier, scripts)       |
| `arch`          | Documentación de arquitectura                                |

---

## 5. Cuerpo del Commit

Opcional. Usar cuando el subject no es suficiente para entender el **porqué** del cambio.

- Separado del subject por una línea en blanco.
- Explica la motivación y el contexto, no el qué (eso lo hace el código).
- Límite recomendado: 100 caracteres por línea.

```
feat(inventario): GIM-101 add product stock management endpoint

Se agregó el endpoint POST /inventario/movimiento para registrar
entradas y salidas de stock. La validación de stock negativo se
aplica solo en salidas, permitiendo ajustes de inventario positivos
sin restricción.
```

---

## 6. Pie del Commit — Smart Commits de Jira

El pie se usa para tres propósitos:
1. Declarar breaking changes (`BREAKING CHANGE:`).
2. Referenciar tickets relacionados (`Refs: GIM-XXX`).
3. Enviar **Smart Commits** a Jira para transicionar tickets o registrar tiempo.

### Comandos Smart Commits disponibles

| Comando             | Efecto en Jira                        |
|---------------------|---------------------------------------|
| `GIM-101 #comment <texto>` | Agrega comentario al ticket    |
| `GIM-101 #time 2h 30m`     | Registra tiempo trabajado      |
| `GIM-101 #done`            | Transiciona a "Done"           |
| `GIM-101 #in-progress`     | Transiciona a "In Progress"    |
| `GIM-101 #code-review`     | Transiciona a "Code Review"    |

**Ejemplo completo con smart commits:**
```
feat(inventario): GIM-101 add product stock management endpoint

Implementa el endpoint para registrar movimientos de inventario
con validación de stock negativo en salidas.

GIM-101 #comment Endpoint implementado y testeado localmente
GIM-101 #time 3h
GIM-101 #done
```

---

## 7. Commits en Trunk-Based Development

En TBD, los commits deben ser **pequeños, frecuentes y enfocados**:

### Buenas prácticas

- **Un commit = un cambio lógico.** No mezclar refactors con features en un mismo commit.
- **Commitear frecuentemente** dentro de la rama (varias veces al día), no acumular trabajo.
- El historial de la rama debe contar una historia coherente del trabajo realizado.
- Antes de abrir el PR, revisar el historial con `git log --oneline` y hacer `git rebase -i` si es necesario limpiar commits de WIP.

### Commits WIP (Work in Progress)

Durante el desarrollo es aceptable tener commits de WIP, pero **deben limpiarse antes del merge**:

```
wip: experimenting with stock calculation
wip: fix tests
```

Estos se consolidan o reescriben con `git rebase -i` antes de crear el PR.

---

## 8. Mensajes de Merge Commit

Para los merges de PR a `main`, usar el título del PR como mensaje del merge. GitHub genera automáticamente el merge commit con el título del PR cuando se usa Squash & Merge.

**Formato recomendado para PR title (y por tanto merge commit):**
```
feat(inventario): GIM-101 add product stock management endpoint (#15)
```

---

## 9. Tabla de Ejemplos

| Situación                                 | Mensaje de commit                                                      |
|-------------------------------------------|------------------------------------------------------------------------|
| Nueva pantalla de inventario (con ticket) | `feat(ui): GIM-45 add inventory dashboard with stock alerts`           |
| Bug en cálculo de stock                   | `fix(inventario): GIM-87 correct negative stock validation logic`      |
| Actualizar dependencia pnpm               | `chore(deps): GIM-55 update express to 4.19.0`                         |
| Agregar test unitario                     | `test(compras): GIM-99 add unit test for orden compra creation`        |
| Refactor repositorio MySQL                | `refactor(db): GIM-78 extract base repository class for MySQL`         |
| Cambio en pipeline CI                     | `ci: GIM-120 add pnpm cache to GitHub Actions workflow`                |
| Corrección de typo en docs                | `docs: fix typo in README installation section`                        |
| Breaking change en API                    | `feat(api)!: GIM-200 remove deprecated productos/list endpoint`        |
| Tarea de mantenimiento sin ticket         | `chore: update .gitignore patterns`                                    |
| Agregar Docker para desarrollo            | `chore(infra): GIM-60 add docker-compose for local development`        |

---

## 10. Validación Automática

Se recomienda instalar **commitlint** para validar mensajes en el hook `commit-msg`:

```bash
# Instalar dependencias de desarrollo
pnpm add -D @commitlint/cli @commitlint/config-conventional

# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [
      'inventario', 'compras', 'proveedores', 'mantenimiento',
      'auth', 'db', 'api', 'ui', 'infra', 'config', 'deps', 'dev', 'arch'
    ]],
    'subject-max-length': [2, 'always', 100],
  }
};
```

Con **Husky** para el hook:
```bash
pnpm add -D husky
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
