'use strict';

module.exports = (models) => {
  assert(_.isPlainObject(models));

  return {
    attributes: require('./attributes')(models),
    categories: require('./categories')(models),
    tools: require('./tools')(models)
  };
};
