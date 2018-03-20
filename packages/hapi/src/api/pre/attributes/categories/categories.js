'use strict';

const Boom = require('boom');

module.exports = (models) => {
  assert(_.isPlainObject(models));

  const AttributeCategory = models.AttributeCategory;

  return {
    exists: (request, reply) => {
      Tool.findById(request.params.categoryId).then((category) => {
        if (!category) {
          return Promise.reject(Boom.notFound());
        }

        request.resources = request.resources || {};
        request.resources.category = category;

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
        helpers.generateUniqueSlug(request.payload.name, AttributeCategory, 'title').then((title) => {
          request.payload.title = title;

          reply.continue();
        }).catch((err) => {
          reply(err);
        });
      }
    }
  };
};
