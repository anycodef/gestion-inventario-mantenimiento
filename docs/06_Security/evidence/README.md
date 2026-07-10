# Evidencia DAST — OWASP ZAP

Reportes de escaneo dinámico (DAST) con OWASP ZAP para el hardening OWASP Top 10 2025 (Epic KAN-22).

- `before/` — estado ANTES del hardening (baseline sobre la API :3001): **0 FAIL · 7 WARN · 60 PASS**.
- `after/`  — estado DESPUÉS del hardening (re-scan comparativo): **0 FAIL · 2 WARN · 65 PASS**.

Las 7 cabeceras de seguridad ausentes quedaron resueltas. Ver el análisis completo en
[`../owasp-mapping.md`](../owasp-mapping.md).

Generación (cambiar `before` por `after` según corresponda):

```bash
docker run --rm --network host \
  -v $PWD/docs/06_Security/evidence/before:/zap/wrk \
  zaproxy/zap-stable zap-baseline.py \
  -t http://localhost:3001 -r zap-baseline-api.html -J zap-baseline-api.json -I
```
