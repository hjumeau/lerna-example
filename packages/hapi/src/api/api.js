const _ = require('lodash');
const assert = require('assert');
const Hapi = require('hapi');
const Swaggerize = require('swaggerize-hapi');

module.exports = (JSONPackage, config, logger, search, models) => {
  assert(_.isPlainObject(JSONPackage));
  assert(_.isPlainObject(config));
  assert(_.isPlainObject(models));

  const server = new Hapi.Server();
  const docsPath = '/swagger.json';
  const docsPathWithPrefix = config.api.prefix + docsPath;

  server.connection({
    port: config.api.port,
    uri: config.api.uri,
    routes: {cors: config.api.cors}
  });

  const pre = require('./pre')(models);
  const handlers = require('./handlers')(pre, models, search);
  const security = require('./security')(config);

  server.ext('onPostHandler', (request, reply) => {

    if (request.url.path === docsPathWithPrefix) {
      return reply.continue();
    }

    let response = request.response;

    if (response.isBoom) {
      if (response.statusCode === 500) {
        server.plugins.raven.client.captureError(response)
      }

      return reply(response);
    }

    reply.continue({data: response.source});
  });

  // define security
  when(server.register(security.jwt.scheme)).then((err) => {
    server.auth.strategy(security.jwt.name, security.jwt.name, security.jwt.options);

    server.auth.default('jwt');
  });

  return when(server.register([{
    register: require('hapi-raven'),
    options: {
      dsn: config.sentry.dsn,
      release: JSONPackage.version
    }
  }, {
    register: Swaggerize,
    options: {
      api: require('./definition')(JSONPackage, config),
      docspath: docsPath,
      handlers: handlers,
      vhost: config.api.vhost,
      cors: config.api.cors
    }
  }])).then(() => {
    return when.promise((resolve, reject) => {
      server.start((err) => {
        if (err) {
          return reject(err);
        }

        resolve(server);
      })
    })
  });
};
