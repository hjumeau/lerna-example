module.exports = {
  title: 'Cat',
  type: 'object',
  required: [
    'id',
    'name'
  ],
  properties: {
    id: {
      type: 'integer',
      format: 'int32'
    },
    title: {
      type: 'string'
    },
    name: {
      type: 'string'
    }
  }
};
