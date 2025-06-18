require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT,
    viewEngine: process.env.VIEW_ENGINE,
  },
  bdd: {
    board: process.env.SQL_BOARD,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    host: process.env.SQL_HOST,
    dialect: "mysql",
    port: process.env.SQL_PORT,
  }
}