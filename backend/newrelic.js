'use strict'
/**
 * New Relic agent configuration.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: [process.env.NEW_RELIC_APP_NAME || 'gestion-inventario-mantenimiento-backend'],
  /**
   * Your New Relic license key.
   */
  license_key: process.env.NEW_RELIC_LICENSE_KEY || '',
  logging: {
    /**
     * Level at which to log. 'info' is recommended for most production environments.
     */
    level: 'info'
  },
  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be sent for all traces, errors, and span events.
   */
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie',
      'response.headers.x*'
    ]
  }
}
