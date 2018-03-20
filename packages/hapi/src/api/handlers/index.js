module.exports = (pre, models) => {
  assert(_.isPlainObject(pre));
  assert(_.isPlainObject(models));

  return {
    categories: require('./categories')(pre.categories, models.categories),
  }
};
