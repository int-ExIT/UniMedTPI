const app = require("../config/app");

//----------------------------------------------- IMPORT ROUTES ---
const index = require("./login.router");
const patient = require("./patient.router");

//-------------------------------------------------- GET ROUTES ---
app.use(index);
app.use(`/patient`, patient);

module.exports = app;