/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'gallery',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': ["'self'", "https://cdn.mxpnl.com"],
      'font-src': ["'self'", "http://fonts.gstatic.com"],
      'connect-src': ["'self'", "http://localhost:3000"],
      'img-src': "'self' data: http://localhost:3000/images/",
      'style-src': ["'self'", "'unsafe-inline'", "http://fonts.googleapis.com"],
      'media-src': null
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      api: {
        'url': 'http://localhost:3000/images/all',
        'method': 'GET'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
