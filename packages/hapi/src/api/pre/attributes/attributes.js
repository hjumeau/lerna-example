'use strict';

const Boom = require('boom');

module.exports = (models) => {
  assert(_.isPlainObject(models));

  const Attribute = models.Attribute;

  return {
    exists: (request, reply) => {
      Attribute.findById(request.params.attributeId).then((attribute) => {
        if (!attribute) {
          return Promise.reject(Boom.notFound());
        }

        request.resources = request.resources || {};
        request.resources.attribute = attribute;

        return reply.continue();
      }).catch((err) => {
        reply(err);
      });
    },

    authorized: (request, reply) => {
      reply.continue();
    },

    title: {
      generate: (request, reply) => {
        helpers.generateUniqueSlug(request.payload.name, Attribute, 'title').then((title) => {
          request.payload.title = title;

          reply.continue();
        }).catch((err) => {
          reply(err);
        });
      }
    },

    categories: require('./categories')(models)
  };
};
