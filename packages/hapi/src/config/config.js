module.exports = (logger) => {
  const env = require('common-env/withLogger')(logger);
  const configAsJson = require('./config.json');

  return env.getOrElseAll(configAsJson);
};
