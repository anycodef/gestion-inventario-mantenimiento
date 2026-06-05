# Sistema de Gestión de Inventario y Mantenimiento

Sistema web para la gestión de inventario, órdenes de compra, movimientos de stock y control de proveedores. Este repositorio es un **fork de mantenimiento** del proyecto original de desarrollo, a cargo de un equipo independiente responsable de la etapa de mantenimiento de software (ISO/IEC 14764).

> **Repositorio original de desarrollo:** [AdrianP17/Gestion-inventario](https://github.com/AdrianP17/Gestion-inventario)

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Módulos del Sistema](#módulos-del-sistema)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución](#ejecución)
- [Observabilidad y Monitoreo](#observabilidad-y-monitoreo)
- [Linting](#linting)
- [Gestión de Cambios](#gestión-de-cambios)
- [Equipos](#equipos)

---

## Descripción

El sistema permite a las organizaciones:

- Controlar el stock de productos en tiempo real con alertas de niveles mínimos y máximos.
- Gestionar el ciclo completo de compras: creación de orden, aprobación y recepción con actualización atómica de inventario.
- Registrar salidas de inventario y mantener trazabilidad mediante Kardex.
- Administrar proveedores y categorías de productos.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Backend** | Node.js · TypeScript · Express.js |
| **Frontend** | Next.js 15 · React 18 · Tailwind CSS · Radix UI · TanStack Table |
| **Base de datos** | PostgreSQL · MySQL (implementaciones duales) |
| **Infraestructura** | Docker · Docker Compose |
| **Gestor de paquetes** | pnpm (workspace monorepo) |
| **Observabilidad** | New Relic APM (backend + frontend) |
| **Linting** | ESLint (TypeScript + React) |

---

## Arquitectura

El backend implementa **Clean Architecture** con separación estricta por capas:

```
backend/src/
├── domain/                  # Entidades y contratos de repositorio
│   ├── entities/
│   └── repositories/
├── application/             # Casos de uso (lógica de negocio)
│   └── use-cases/
├── infrastructure/          # Implementaciones de repositorio (MySQL / PostgreSQL)
│   └── database/
│       ├── mysql/
│       └── postgresql/
└── interfaces/              # Controladores y rutas HTTP
    ├── controllers/
    └── routes/
```

El sistema soporta dos motores de base de datos de forma intercambiable. La capa de infraestructura implementa los contratos definidos en `domain/repositories`, permitiendo cambiar el motor sin modificar la lógica de negocio.

---

## Módulos del Sistema

| Módulo | Descripción |
|---|---|
| **Productos** | CRUD de productos con SKU, niveles de stock mín/máx y estado |
| **Inventario** | Consulta de stock actual, alertas de mínimos y máximos |
| **Órdenes de Compra** | Creación, aprobación y trazabilidad de órdenes con detalles |
| **Recepción de Compra** | Registro de mercancía recibida con actualización atómica de stock |
| **Salidas de Inventario** | Registro de salidas con detalle por producto |
| **Kardex** | Historial de movimientos de inventario (entradas y salidas) |
| **Proveedores** | Gestión de proveedores vinculados a órdenes de compra |
| **Categorías** | Clasificación de productos |

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 11 — `npm install -g pnpm`
- [Docker](https://www.docker.com/) y Docker Compose (para levantar las bases de datos)
- Cuenta en [New Relic](https://newrelic.com/) (free tier, sin tarjeta de crédito) para monitoreo

---

## Instalación y Configuración

**1. Clonar el repositorio**

```bash
git clone https://github.com/anycodef/gestion-inventario-mantenimiento.git
cd gestion-inventario-mantenimiento
```

**2. Instalar dependencias**

```bash
pnpm install
```

**3. Configurar variables de entorno**

Copiar el archivo de ejemplo y completar los valores:

```bash
cp .env.example .env
```

Variables requeridas:

```env
# --- Base de datos activa ---
# Opciones: "mysql" o "postgresql"
DB_TYPE=postgresql

# --- PostgreSQL ---
POSTGRESQL_HOST=localhost
POSTGRESQL_USER=postgres
POSTGRESQL_PASSWORD=yourpassword
POSTGRESQL_DB=inventario
POSTGRESQL_PORT=5432

# --- MySQL ---
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=inventario

# --- Backend ---
PORT=3001

# --- Frontend ---
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# --- New Relic (Observabilidad) ---
# Obtener la license key desde: https://one.newrelic.com → API keys
NEW_RELIC_LICENSE_KEY=YOUR_NEW_RELIC_LICENSE_KEY
NEW_RELIC_APP_NAME=gestion-inventario-backend
NEW_RELIC_FRONTEND_APP_NAME=gestion-inventario-frontend
```

> **Nota:** Las variables `NEW_RELIC_*` son opcionales para desarrollo local. El sistema funciona sin ellas; simplemente no enviará métricas a New Relic. Para producción o ambientes de QA se recomienda configurarlas.

**4. Levantar la base de datos con Docker**

```bash
docker-compose up -d
```

Esto inicializa el esquema con `init.sql` automáticamente.

---

## Ejecución

**Modo desarrollo**

```bash
# Backend
cd backend && pnpm dev

# Frontend (en otra terminal)
cd frontend && pnpm dev
```

**Con Docker Compose (aplicación completa)**

```bash
docker-compose up
```

El frontend estará disponible en `http://localhost:3000` y el backend en `http://localhost:3001` (o según lo configurado en `.env`).

---

## Observabilidad y Monitoreo

El sistema integra **New Relic APM** para observabilidad full-stack. Una vez configuradas las variables de entorno e iniciada la aplicación, ambos servicios aparecerán automáticamente en el dashboard de New Relic bajo **APM & Services**.

### ¿Qué se monitorea?

| Área | Descripción |
|---|---|
| **APM — Backend** | Latencia y throughput por endpoint, errores HTTP, trazas de transacciones |
| **APM — Frontend** | Server-side rendering de Next.js, naming de rutas y transacciones |
| **Base de datos** | Tiempo de ejecución de queries, queries lentas |
| **Logs** | Logs centralizados del backend con correlación a trazas |
| **Alertas** | Notificaciones configurables ante errores o degradación de rendimiento |

### Obtener la License Key

1. Crear cuenta gratuita en [newrelic.com](https://newrelic.com) (100 GB/mes incluidos, sin tarjeta de crédito)
2. Ir a **API keys** en el dashboard de New Relic
3. Copiar la **License key (Ingest)** y pegarla en `NEW_RELIC_LICENSE_KEY` del `.env`

> Los agentes de New Relic están preconfigurados en `backend/newrelic.js` y `frontend/newrelic.js`. No se requiere ninguna modificación adicional al código.

---

## Linting

```bash
# Verificar
pnpm lint

# Corregir automáticamente
pnpm lint:fix
```

La configuración de ESLint aplica reglas de TypeScript estrictas para el backend y reglas de React/hooks para el frontend (ver `eslint.config.js`).

---

## Gestión de Cambios

El proyecto utiliza **Trunk-Based Development** integrado con Jira (proyecto `KAN`) para el seguimiento de tareas de mantenimiento. Los estándares de ramas y mensajes de commit están documentados en:

- [`docs/branching-strategy.md`](docs/branching-strategy.md) — Estrategia de ramas (TBD + Jira)
- [`docs/commit-conventions.md`](docs/commit-conventions.md) — Convenciones de commits (Conventional Commits + Jira)
- [`docs/05_Configuration_Management/`](docs/05_Configuration_Management/) — Protocolo formal de control de cambios

Clasificación de mantenimiento según **ISO/IEC 14764**:

| Tipo | Descripción |
|---|---|
| Correctivo | Corrección de defectos detectados en producción |
| Adaptativo | Adaptaciones a nuevos entornos o requisitos externos |
| Perfectivo | Mejoras de rendimiento, usabilidad o mantenibilidad |
| Preventivo | Refactorizaciones para reducir deuda técnica futura |

---

## Equipos

### Equipo de Desarrollo Original

Proyecto académico desarrollado en la asignatura de Base de Datos 1.

| Nombre | GitHub |
|---|---|
| Palacios Aguilar, Adrian Alessandro | [@AdrianP17](https://github.com/AdrianP17) |
| Espinoza Aponte, Wilson Fabrizzio | — |
| Serna Quiroz, Andrew Gabriel | — |
| Jara, Jhonatan Said | — |

### Equipo de Mantenimiento

Responsable de la etapa de mantenimiento del sistema en este fork, a partir de 2026.

| Nombre | Rol |
|---|---|
| Sota Rios, Pedro Josue | Mantenimiento de software |
| Palacios Aguilar, Adrian Alessandro | Mantenimiento de software |
| Quiñonez Rivera, Esteban | Mantenimiento de software |
| Pérez Acosta, Roddy | Mantenimiento de software |
