module.exports = (JSONPackage, logger) => {
  const config = require('./config')(logger);
  const createServer = require('./api');
  const domain = require('./domain')(config);

  return domain.sequelize.authenticate().then(() => {
    return createServer(JSONPackage, config, logger, domain.schemas);
  }).then((server) => {
    return {server, config, domain};
  });
};
