const JSONPackage = require('./package.json');

const logger = require('./src/logger')(JSONPackage);

process.title = JSONPackage.title;

require('./src')(JSONPackage, logger).done((app) => {
    logger.info('Server started at %s', app.config.api.port);
}, (err) => {
    logger.error('Server start error', String(err));
    throw err;
});
