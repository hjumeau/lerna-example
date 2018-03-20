'use strict';

module.exports = (logger) => {
  var env = require('common-env/withLogger')(logger);
  var configAsJson = require('./config.json');

  return env.getOrElseAll(configAsJson);
};
