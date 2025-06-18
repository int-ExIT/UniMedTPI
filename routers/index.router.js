const app = require("../config/app");

//----------------------------------------------- IMPORT ROUTES ---
const bed = require("./bed.router");
const study = require("./study.router");
const patient = require("./patient.router");
const index = require("./admission.router");

//-------------------------------------------------- GET ROUTES ---
app.use(index);
app.use(`/bed`, bed);
app.use(`/study`, study);
app.use(`/patient`, patient);

//------------------------------------------------------ ERRORS ---
app.use((req, res, next) => {
  res.status(404).render("error", {
    status: 404
  });
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.stack}`);

  res.status(500).render("error", {
    status: 500
  });
});

module.exports = app;