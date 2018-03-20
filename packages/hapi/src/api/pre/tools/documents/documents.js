'use strict';

const Boom = require('boom');

module.exports = (models) => {
  assert(_.isPlainObject(models));

  const Document = models.Document;

  return {
    exists: (request, reply) => {
      Document.findById(request.params.documentId).then((document) => {
        if (!document) {
          return Promise.reject(Boom.notFound());
        }

        request.resources = request.resources || {};
        request.resources.document = document;

        return reply.continue();
      }).catch((err) => {
        reply(err);
      })
    },

    authorized: (request, reply) => {
      reply.continue();
    }
  };
};
