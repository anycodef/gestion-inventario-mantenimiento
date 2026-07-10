// Carga opcional del agente New Relic (KAN-38).
// Se usa como preload vía NODE_OPTIONS="--require ./newrelic-loader.js".
// Solo instrumenta si hay licencia configurada y nunca rompe el arranque:
// sin NEW_RELIC_LICENSE_KEY el agente queda dormido y la app corre normal.
if (process.env.NEW_RELIC_LICENSE_KEY) {
  try {
    require('newrelic');
  } catch (err) {
    console.warn('[newrelic] agente no disponible, se continúa sin APM:', err.message);
  }
}
