'use strict';

module.exports = (JSONPackage, logger) => {
  const config = require('./config')(logger);
  const createServer = require('./api');
  const domain = require('./domain')(config);
  const search = require('./search')(config, domain.schemas);

  return domain.sequelize.authenticate().then(() => {
    return createServer(JSONPackage, config, logger, search, domain.schemas);
  }).then((server) => {
    return {server, config, domain};
  });
};
