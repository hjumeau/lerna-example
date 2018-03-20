'use strict';

const Joi = require('joi');

module.exports = {
  attribute: Joi.string().alphanum().min(3).max(255),
  value: Joi.string().alphanum().min(3).max(255)
};
