'use strict';

const Winston = require('winston');

module.exports = (JSONPackage) => {
  assert(_.isString(JSONPackage.name) && JSONPackage);

  const config = require('common-env/withLogger')(Winston).getOrElseAll({
    logger: require('./config/config.json').logger
  }).logger;

  let transports = [];

  if (config.transports.console.enabled) {
    transports.push(new Winston.transports.Console(config.transports.console.config));
  }

  return new Winston.Logger({
    transports: transports,
    timestamp: config.timestamp,
    level: config.level
  });
};
