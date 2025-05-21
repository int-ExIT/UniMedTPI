const router = require(`express`).Router();
const patientControl = require(`../controls/patient.control`);

router.get(`/patient`, (req, res) => {
  res.status(200).render(`patient`, {
    title: "UniMed",
    script: "../public/scripts/data.js",
    styles: "../public/styles/patient.css",
  });
});

router.post(`/patient`, async (req, res) => {
  try {
    const idPatient = await patientControl.createPatient(req.body);

    res.status(201).json({
      message: "Paciente registrado correctamente",
      body: idPatient,
    });
  } catch (err) {
    if (err.name === `SequelizeUniqueConstraintError`) {
      res.status(400).json({
        message: "El paciente ya exste en la base de datos"
      });
    }
    else {
      res.status(500).json({
        message: "No se pudo registrar al paciente"
      });
    }
  }
});

module.exports = router;