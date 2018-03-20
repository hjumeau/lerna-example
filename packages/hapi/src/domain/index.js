const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  port: config.db.port
});

const schemas = {
  Category: sequelize.define('cat', require('./Cat')),
};

module.exports = {
  sequelize,
  schemas
};
