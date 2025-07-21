const app = require('../config/app');
const checkToken = require('../middleware/checkToken');

//--------------------------------------------------------- IMPORT ROUTES ---
const bed = require('./bed.router');
const login = require('./login.router');
const nurse = require('./nurse.router');
const study = require('./study.router');
const patient = require('./patient.router');
const admission = require('./admission.router');

//------------------------------------------------------------ GET ROUTES ---
app.use('/', login);
app.use('/bed', checkToken(['Recepcionista', 'Enfermero', 'Medico']), bed);
app.use('/study', checkToken(['Recepcionista', 'Enfermero', 'Medico']), study);
app.use('/patient', checkToken(['Recepcionista', 'Enfermero', 'Medico']), patient);
app.use('/admission', checkToken(['Recepcionista']), admission);
app.use('/nurse', checkToken(['Enfermero']), nurse);

//---------------------------------------------------------------- ERRORS ---
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