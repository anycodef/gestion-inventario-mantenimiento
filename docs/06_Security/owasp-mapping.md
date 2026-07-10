# Mapeo OWASP Top 10 2025 → Proyecto

Este documento traza el **hardening de seguridad** aplicado al Sistema de Gestión de
Inventario y Mantenimiento contra el **OWASP Top 10 2025**, con la evidencia dinámica
(DAST con OWASP ZAP) antes y después de las correcciones.

- **Epic Jira:** [KAN-22](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-22) — Hardening de seguridad OWASP Top 10 2025.
- **Metodología:** medir (DAST baseline) → corregir (por card, bajo TBD) → re-medir (DAST) → verificación continua (CI).
- **Evidencia:** `docs/06_Security/evidence/before/` y `docs/06_Security/evidence/after/`.

---

## 1. Resultado DAST — OWASP ZAP (antes vs. después)

Escaneo baseline sobre la API en ejecución (`http://localhost:3001`):

| Métrica | Antes | Después |
|---|---|---|
| FAIL | 0 | 0 |
| **WARN** | **7** | **2** |
| PASS | 60 | **65** |
| Alertas totales | 9 | 3 |

Las **7 cabeceras de seguridad ausentes** (A02) quedaron resueltas. Además, controles
como COEP resolvieron el aislamiento contra Spectre (nuevo PASS), y *Application Error
Disclosure* pasa a PASS tras centralizar el manejo de errores (A10).

**Alertas restantes (menores):**

| Alerta ZAP | Riesgo | Comentario |
|---|---|---|
| CSP: Wildcard Directive | Medio | CSP por defecto de helmet con directivas amplias (`https:`, `data:`). Mejora fina futura: endurecer la CSP. |
| CSP: style-src unsafe-inline | Medio | Igual que arriba; `'unsafe-inline'` en estilos por defecto de helmet. |
| Non-Storable Content | Info | Consecuencia **deseada** de `Cache-Control: no-store` que fijamos en KAN-29. |

---

## 2. Mapeo por categoría OWASP Top 10 2025

| Categoría | Riesgo detectado en el código | Control aplicado | Card(s) |
|---|---|---|---|
| **A01 Broken Access Control** | Todos los endpoints `/api/*` accesibles sin autenticación (ZAP + curl: 200 sin credenciales) | Middleware `authenticate` (JWT) en todas las rutas de negocio; `authorize(rol)` (RBAC) en escrituras de producto | [KAN-34](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-34) |
| **A02 Security Misconfiguration** | Faltan cabeceras de seguridad; CORS abierto (`*`)¹; sin rate-limiting; `X-Powered-By` expuesto | `helmet` (X-Frame-Options, nosniff, CSP, COEP), `Permissions-Policy`, `Cache-Control: no-store`, `express-rate-limit`, `hidePoweredBy`, CORS restringido a `FRONTEND_URL` | [KAN-23…31](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-22) |
| **A03 Software Supply Chain Failures** | CI sin escaneo de dependencias ni secretos | Dependabot + `pnpm audit` + `gitleaks` + **CodeQL** (SAST) | [KAN-36](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-36) |
| **A04 Cryptographic Failures** | — | Contraseñas con hash **bcrypt**; secretos fuera del repo (`.env` no versionado); JWT firmado | KAN-34 (transversal) |
| **A05 Injection** | Sin validación de entrada (defensa en profundidad; el SQL ya es **parametrizado** `$1`) | Middleware `validateBody` con **Zod** en rutas de escritura de producto | [KAN-33](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-33) |
| **A06 Insecure Design** | Entrada no validada llegaba a los casos de uso | Esquemas Zod como contrato de entrada explícito | KAN-33 |
| **A07 Authentication Failures** | No existía identidad ni login | Endpoint `POST /api/auth/login` con verificación bcrypt y emisión de JWT (expiración 8h) | KAN-34 |
| **A08 Software/Data Integrity Failures** | — | Lockfiles con integridad (`pnpm-lock.yaml`); dependencias fijadas; Dependabot | KAN-36 (transversal) |
| **A09 Security Logging & Alerting Failures** | Sin logging estructurado de seguridad | `pino` + `pino-http` con **redacción** de datos sensibles (authorization, cookie, password, token) | [KAN-35](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-35) |
| **A10 Mishandling of Exceptional Conditions** | Los controllers devolvían `error.message` interno al cliente (stack/SQL) | Middleware `errorHandler` central: 500 genérico, sin filtrar detalles; log interno | [KAN-32](https://unmsm-team-ielngzdw.atlassian.net/browse/KAN-32) |

> ¹ El CORS abierto (`origin: '*'`) ya había sido corregido en `main` por un commit previo
> (`16fe3f0`); documentado y cerrado en KAN-30.

---

## 3. Verificación continua — tríada de AppSec

El proyecto integra las tres capas de pruebas de seguridad de aplicaciones:

| Capa | Qué prueba | Herramienta |
|---|---|---|
| **SAST** | Código estático | SonarQube Cloud + **CodeQL** + ESLint |
| **SCA** | Dependencias y secretos | Dependabot + `pnpm audit` + gitleaks |
| **DAST** | Aplicación en ejecución | **OWASP ZAP** (baseline en cada PR) |

Cada control está cubierto por **tests** (Vitest + supertest) y validado por el
**Quality Gate** de SonarCloud. El escaneo ZAP corre en CI en cada Pull Request
(`.github/workflows/dast.yml`), demostrando el enfoque *shift-left*.

---

## 4. Deuda / mejoras futuras

- Endurecer la CSP de helmet (eliminar `unsafe-inline` y directivas amplias).
- Flujo de login en el **frontend** (hoy la API protegida devuelve 401 a las llamadas
  anónimas del front) — relacionado con KAN-7.
- Sanear las respuestas `400` con `error.message` en controllers de salidas/kardex/órdenes
  (errores de dominio; baja prioridad).
- Extender la validación Zod al resto de módulos.
- Convertir los escaneos de CI (audit/gitleaks) en bloqueantes una vez saneada la línea base.
