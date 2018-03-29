const _ = require('lodash');
const assert = require('assert');

module.exports = (pre, models) => {
  assert(_.isPlainObject(pre));
  assert(_.isPlainObject(models));

  return {
    categories: require('./categories')(pre.categories, models.categories),
  }
};
