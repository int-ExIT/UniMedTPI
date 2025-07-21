require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT,
    viewEngine: process.env.VIEW_ENGINE,
    base_url: process.env.BASE_URL,
  },
  bdd: {
    board: process.env.SQL_BOARD,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    dialect: process.env.SEQUELIZE_DIALECT,
    port: process.env.SQL_PORT,
  },
  jwt: {
    secret_key: process.env.SECRET_KEY,
  }
}