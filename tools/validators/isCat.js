const {isObject} = require('lodash');

const { CAT_TYPES } = require('./const');

const isCat = cat =>
  isObject(cat) && CAT_TYPES.some(type => type === cat.type);

module.exports = isCat;
