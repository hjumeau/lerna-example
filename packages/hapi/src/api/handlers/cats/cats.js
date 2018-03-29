const Boom = require("boom");

module.exports = ({ exists }, { Cat }) => ({
  $get: (request, reply) => {
    Cat.findAll({
      order: [["id", "ASC"]]
    })
      .then(cats => {
        reply(cats);
      })
      .catch(err => {
        reply(err);
      });
  },

  $post: (request, reply) => {
    helpers
      .generateUniqueSlug(request.payload.name, Category, "title")
      .then(slug => {
        request.payload.title = slug;

        if (request.payload.category) {
          return Category.findOne({ title: request.payload.category });
        }

        return request.payload;
      })
      .then(category => {
        if (request.payload.category && !category) {
          return reply(Boom.notFound("Category not found"));
        } else if (request.payload.category && category.id) {
          request.payload.categories_id = category.id;
        }

        category = request.payload;

        return Category.create(category);
      })
      .then(category => {
        reply(category).code(201);
      })
      .catch(err => {
        console.log(err);
        reply(err);
      });
  },

  "{categoryId}": {
    $get: [
      pre.exists,
      pre.authorized,
      (request, reply) => {
        reply(request.resources.category);
      }
    ],

    $put: [
      pre.exists,
      pre.authorized,
      (request, reply) => {
        let category = request.resources.category;

        category
          .update(request.payload)
          .then(category => {
            reply(category);
          })
          .catch(err => {
            reply(err);
          });
      }
    ],

    $delete: [
      pre.exists,
      pre.authorized,
      (request, reply) => {
        let category = request.resources.category;

        category
          .destroy()
          .then(() => {
            reply().code(201);
          })
          .catch(err => {
            reply(err);
          });
      }
    ]
  }
});
