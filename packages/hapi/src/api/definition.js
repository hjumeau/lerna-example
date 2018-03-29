module.exports = (packageJson, config) => ({
  swagger: "2.0",
  schemes: ["http", "https"],
  info: {
    title: packageJson.title,
    description: packageJson.description,
    contact: packageJson.author,
    license: packageJson.license,
    version: packageJson.version
  },
  host: config.api.vhost,
  basePath: config.api.prefix,
  consumes: ["application/vnd.api+json"],
  produces: ["application/vnd.api+json"],

  /**
   * Security Definitions
   */
  securityDefinitions: require("./securityDefinitions"),

  /**
   * Definitions
   */
  definitions: require("./definitions"),

  /**
   * Routes
   */

  paths: require("./routes")
});
