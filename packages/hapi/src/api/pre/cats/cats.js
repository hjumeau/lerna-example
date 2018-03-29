const _ = require('lodash');
const assert = require('assert');
const Boom = require('boom');

module.exports = (models) => {
  assert(_.isPlainObject(models));

  const Category = models.Category;

  return {
    exists: (request, reply) => {
      Category.findById(request.params.categoryId).then((category) => {
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
  };
};
