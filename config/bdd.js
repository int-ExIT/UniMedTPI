const { Sequelize } = require(`sequelize`);
const config = require(`../config`);

module.exports = new Sequelize(
  config.bdd.board,
  config.bdd.user,
  config.bdd.password,
  {
    host: config.bdd.host,
    dialect: config.bdd.dialect,
    port: config.bdd.port,
  }
);