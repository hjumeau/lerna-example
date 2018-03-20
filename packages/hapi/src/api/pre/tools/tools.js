'use strict';

const Boom = require('boom');

module.exports = (models) => {
  assert(_.isPlainObject(models));

  const Tool = models.Tool;

  return {
    exists: (request, reply) => {
      Tool.findById(request.params.toolId).then((tool) => {
        if (!tool) {
          return Promise.reject(Boom.notFound());
        }

        request.resources = request.resources || {};
        request.resources.tool = tool;

        return reply.continue();
      }).catch((err) => {
        reply(err);
      });
    },

    authorized: (request, reply) => {
      reply.continue();
    },

    documents: require('./documents')(models)
  };
};
