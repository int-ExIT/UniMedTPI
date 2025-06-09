const app = require("../config/app");

//----------------------------------------------- IMPORT ROUTES ---
const bed = require("./bed.router");
const study = require("./study.router");
const index = require("./login.router");
const patient = require("./patient.router");
const admission = require("./admission.router");

//-------------------------------------------------- GET ROUTES ---
app.use(index);
app.use(`/bed`, bed);
app.use(`/study`, study);
app.use(`/patient`, patient);
app.use(`/admission`, admission);

module.exports = app;