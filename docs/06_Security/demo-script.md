# Guion de demo en vivo — Hardening OWASP Top 10 2025

Guion para demostrar el hardening aplicado al proyecto durante la exposición.
Duración estimada: 8–10 min. Requiere Docker y el repo en `main`.

---

## 0. Preparación (antes de exponer)

```bash
docker compose up -d db backend      # levanta API + BD (con seed de usuarios)
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3001/   # debe dar 200
```

---

## 1. La tríada de AppSec (30 s)

Mostrar el diagrama: **SAST** (SonarQube + CodeQL) · **SCA** (Dependabot + audit) ·
**DAST** (OWASP ZAP). Explicar que ZAP es un proyecto OWASP y ataca la app **en ejecución**.

## 2. Evidencia antes/después (2 min)

Abrir los reportes ZAP versionados en el repo:

- `docs/06_Security/evidence/before/zap-baseline-api.html` → **7 WARN** (cabeceras ausentes).
- `docs/06_Security/evidence/after/zap-baseline-api.html` → **2 WARN**, 65 PASS.

> Mensaje: *"Medimos, corregimos y volvimos a medir con la herramienta oficial de OWASP."*

## 3. Cabeceras de seguridad en vivo (1 min)

```bash
curl -I http://localhost:3001/
```

Señalar: `X-Frame-Options`, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`,
`Permissions-Policy`, `Cross-Origin-Embedder-Policy`, `Cache-Control: no-store`,
`RateLimit-*`, y la **ausencia** de `X-Powered-By`.

## 4. Autenticación y autorización (2 min) — A01 / A07

```bash
# Sin token -> 401
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3001/api/productos

# Login -> obtener JWT
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin123"}' | jq -r .token)

# Con token -> 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3001/api/productos \
  -H "Authorization: Bearer $TOKEN"
```

## 5. Manejo de errores y validación (1 min) — A10 / A05

```bash
# Validación Zod: body inválido -> 400 con errores por campo (sin filtrar internos)
curl -s -X POST http://localhost:3001/api/productos \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"nombre":""}'
```

## 6. Trazabilidad Jira + GitHub (2 min)

- Abrir el **Epic KAN-22** en Jira: 19+ cards en *Finalizado*, tipados (Bug/Feature/Task).
- Abrir la lista de **Pull Requests** en GitHub: un PR por fix, CI verde + Quality Gate,
  con la clave `KAN-XX` vinculando cada cambio a su ticket.
- Mostrar el job **OWASP ZAP Baseline** corriendo en un PR (DAST en CI).
- Anécdota: **CodeQL** detectó una alerta durante el desarrollo de la auth (KAN-34) —
  la seguridad automatizada funcionando.

## 7. Cierre (30 s)

Resumen: 10/10 categorías del OWASP Top 10 2025 abordadas, con tests, CI y evidencia
antes/después. Ver `docs/06_Security/owasp-mapping.md`.
