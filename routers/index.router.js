const app = require(`../config/app`);

//----------------------------------------------- IMPORT ROUTES ---
const index = require(`./login.router`);

//-------------------------------------------------- GET ROUTES ---
app.use(`/`, index);

module.exports = app;