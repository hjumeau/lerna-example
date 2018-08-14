var deepExtend = require('deepmerge');

/**
 * Define a new route
 *
 * @param  {Object} options
 * @return {Object} extended `options` with default parameters
 */
function def(options) {
  return deepExtend({
    tags: ['tools'],
    summary: 'not-defined',
    description: 'not-defined',
    operationId: 'not-defined',
    produces: ['application/vnd.api+json'],
    parameters: [],
    responses: {
      400: {
        description: 'Bad Request',
        schema: {
          $ref: '#/definitions/Error'
        }
      },
      404: {
        description: 'Not Found',
        schema: {
          $ref: '#/definitions/Error'
        }
      },
      500: {
        description: 'Internal Server Error',
        schema: {
          $ref: '#/definitions/Error'
        }
      }
    }
  }, options);
}

module.exports = {
  '/cats': {
    get: def({
      summary: 'List categories',
      description: 'List all the categories',
      operationId: 'listCategories',
      responses: {
        200: {
          description: 'List of Categories',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Categories'
              }
            }
          }
        }
      }
    }),

    post: def({
      summary: 'Post category',
      description: 'Post a new category',
      operationId: 'postCategory',
      parameters: [{
        'in': 'body',
        name: 'newCategory',
        description: 'new `Category` object to post',
        required: true,
        schema: {
          $ref: '#/definitions/NewCategory'
        }
      }],
      responses: {
        201: {
          description: 'New category response',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Category'
              }
            }
          }
        }
      }
    })
  },

  '/cats/{catId}': {
    get: def({
      summary: 'Get category',
      description: 'Get a single category by id',
      operationId: 'getCategoryById',
      parameters: [{
        'in': 'path',
        name: 'categoryId',
        description: 'Identifier of the requested category',
        type: 'integer',
        format: 'int32',
        required: true
      }],
      responses: {
        200: {
          description: 'Category response',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Category'
              }
            }
          }
        }
      }
    }),

    put: def({
      summary: 'Update category',
      description: 'Update a single category by id',
      operationId: 'updateCategoryById',
      parameters: [{
        'in': 'path',
        name: 'categoryId',
        description: 'Identifier of the requested category',
        type: 'integer',
        format: 'int32',
        required: true
      }, {
        'in': 'body',
        name: 'updateCategory',
        description: '`Category` object to update',
        required: true,
        schema: {
          $ref: '#/definitions/UpdateCategory'
        }
      }],
      responses: {
        200: {
          description: 'Updated category response',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Category'
              }
            }
          }
        }
      }
    }),

    'delete': def({
      summary: 'Delete category',
      description: 'Delete a single category by id',
      operationId: 'deleteCategoryById',
      parameters: [{
        'in': 'path',
        name: 'categoryId',
        description: 'Identifier of the requested category',
        type: 'integer',
        format: 'int32',
        required: true
      }],
      responses: {
        204: {
          description: 'Deleted category response'
        }
      }
    })
  }
};
