# Branching Strategy — Trunk-Based Development

## 1. Modelo de Flujo de Trabajo

Este proyecto adopta **Trunk-Based Development (TBD)** como modelo de ramas, integrado con Jira para el seguimiento de trabajo. TBD mantiene una única rama de larga vida (`main`) hacia la que todos los desarrolladores integran cambios de forma frecuente mediante ramas de vida corta, garantizando integración continua real y reduciendo conflictos de merge.

### Principios fundamentales

- `main` es la rama de referencia única y siempre debe estar en estado desplegable.
- Las ramas de trabajo son de **vida corta**: deben cerrarse en 1–3 días máximo.
- Los desarrolladores integran a `main` al menos una vez al día.
- El trabajo incompleto se protege con **feature flags**, no con ramas de larga duración.
- No existe una rama `develop` persistente ni ramas de release de larga vida.

---

## 2. Rama Principal

| Rama   | Propósito                                             | Vida        |
|--------|-------------------------------------------------------|-------------|
| `main` | Trunk. Estado siempre desplegable a producción.       | Permanente  |

### Reglas de protección de `main`

- Push directo **deshabilitado**. Todo cambio entra vía Pull Request.
- Requiere al menos **1 aprobación** (code review) antes del merge.
- Los pipelines de CI (lint, tests, build) deben pasar antes del merge.
- `force push` deshabilitado.
- Historial lineal preferido: se recomienda **Squash & Merge** o **Rebase & Merge** para mantener el log limpio en main.

---

## 3. Ramas de Trabajo (Short-Lived Branches)

Todas las ramas se crean desde `main` y se fusionan de vuelta a `main`. Se eliminan tras el merge.

### 3.1 Nomenclatura

```
<tipo>/<JIRA-KEY>-descripcion-corta
```

- `<tipo>`: categoría del trabajo (ver tabla).
- `<JIRA-KEY>`: clave del ticket de Jira obligatoria (ej. `GIM-42`).
- `descripcion-corta`: 2–4 palabras en kebab-case que resuman el trabajo.

**Ejemplos:**
```
feat/GIM-101-crud-productos
fix/GIM-87-inventario-stock-negativo
chore/GIM-55-pnpm-migration
docs/GIM-34-api-documentation
refactor/GIM-78-db-repository-layer
```

### 3.2 Tipos de ramas

| Tipo        | Propósito                                              | Base   | Destino |
|-------------|--------------------------------------------------------|--------|---------|
| `feat/`     | Nueva funcionalidad o mejora significativa             | `main` | `main`  |
| `fix/`      | Corrección de bug no crítico                           | `main` | `main`  |
| `hotfix/`   | Corrección urgente de bug crítico en producción        | `main` | `main`  |
| `chore/`    | Tareas de mantenimiento, dependencias, CI/CD, build    | `main` | `main`  |
| `docs/`     | Documentación exclusivamente                           | `main` | `main`  |
| `refactor/` | Refactorización sin cambio de comportamiento           | `main` | `main`  |
| `test/`     | Adición o corrección de tests                          | `main` | `main`  |

> **Nota sobre hotfix:** dado que `main` siempre es desplegable en TBD, un hotfix es simplemente una rama de `fix/` que se prioriza y se mergea con urgencia. No requiere un flujo especial separado.

---

## 4. Integración con Jira

### 4.1 Conexión rama–ticket

- El nombre de la rama **debe contener la clave del ticket de Jira** (`GIM-XXX`).
- GitHub y Jira detectan automáticamente esta relación y vinculan la rama al ticket.
- El desarrollador mueve el ticket a **"In Progress"** al crear la rama.

### 4.2 Smart Commits

Jira interpreta comandos en los mensajes de commit cuando contienen la clave del ticket. Usar en el cuerpo del commit (no en el subject):

```
GIM-101 #comment Implementado endpoint de creación de producto
GIM-101 #time 2h
GIM-101 #done
```

| Comando      | Efecto en Jira                            |
|--------------|-------------------------------------------|
| `#comment`   | Agrega comentario al ticket               |
| `#time Xh`   | Registra tiempo trabajado                 |
| `#done`      | Transiciona el ticket a "Done"            |
| `#in-progress` | Transiciona el ticket a "In Progress"  |

### 4.3 Pull Request

- El título del PR debe incluir la clave Jira: `feat(inventario): GIM-101 CRUD de productos`.
- Jira detecta el PR y lo vincula al ticket, habilitando el tracking de desarrollo.
- Al mergear el PR, mover el ticket a **"In Review"** o **"Done"** según el flujo del equipo.

---

## 5. Versionamiento Semántico (SemVer)

Los releases se etiquetan directamente sobre `main` siguiendo [SemVer 2.0.0](https://semver.org/).

**Formato:** `vMAJOR.MINOR.PATCH`

| Componente | Cuándo incrementar                                                      |
|------------|-------------------------------------------------------------------------|
| `MAJOR`    | Cambios incompatibles en la API, arquitectura o hitos funcionales clave |
| `MINOR`    | Nueva funcionalidad retrocompatible                                     |
| `PATCH`    | Correcciones de errores retrocompatibles                                |

**Ejemplos:** `v1.0.0`, `v1.3.0`, `v1.3.2`

Los tags se crean sobre `main` tras el merge del último PR que compone el release:

```bash
git tag -a v1.2.0 -m "release: v1.2.0 - módulo de inventario completo"
git push origin v1.2.0
```

---

## 6. Ciclo de Vida de una Rama

```
1. Crear rama desde main:
   git checkout -b feat/GIM-101-crud-productos

2. Desarrollar y commitear frecuentemente (Conventional Commits).
   Commits pequeños y enfocados.

3. Abrir Pull Request hacia main antes de los 3 días.
   Título: "feat(inventario): GIM-101 CRUD de productos"

4. Code review (mínimo 1 aprobación) + CI verde.

5. Merge a main (Squash & Merge o Rebase & Merge).

6. Eliminar la rama tras el merge.

7. Actualizar estado del ticket en Jira.
```

---

## 7. Ramas de Integración Temporal

En situaciones excepcionales (ej. coordinación de múltiples ramas antes de un release, integración con equipos externos), se puede crear una rama de integración temporal:

**Nomenclatura:** `integration/<descripcion>`

Estas ramas son de vida corta, documentadas, y deben mergearse a `main` en un plazo acordado. No reemplazan el flujo TBD regular.

---

## 8. Comparativa con GitFlow

| Aspecto               | GitFlow                          | TBD (este proyecto)              |
|-----------------------|----------------------------------|----------------------------------|
| Ramas largas          | `main`, `develop`                | Solo `main`                      |
| Duración de ramas     | Días/semanas                     | Máximo 1–3 días                  |
| Integración           | Eventual, al cerrar features     | Diaria, continua                 |
| Conflictos de merge   | Frecuentes y costosos            | Mínimos por integración frecuente|
| Releases              | Rama `release/` dedicada         | Tag sobre `main`                 |
| Compatibilidad CI/CD  | Compleja                         | Nativa                           |
| Adecuado para Jira    | Requiere mapeos complejos        | Directo via clave en rama/commit |
