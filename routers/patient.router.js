const router = require(`express`).Router();
const patientControler = require(`../controls/patient.controler`);

router.get(`/patient`, (req, res) => {
  res.status(200).render(`patient`, {
    title: "UniMed-Reception",
    script: "../public/scripts/dataCollector.js",
    styles: "../public/styles/patient.css",
  });
});

// PROBAR
// PROBAR DE MANADAR TODO POR EL BODY
router.get(`/patient/:id`, async (req, res) => {
  try {
    const patient = await patientControler.selectOne(req.params.id);

    res.status(200).json({
      message: "(Patient) Successful Selection",
      body: patient,
    });
  }
  catch (err) {
    res.status(500).json({
      message: "(Patient) Unsuccessful Selection",
    });
  }
});

router.post(`/patient`, async (req, res) => {
  try {
    const patient = await patientControler.insert(req.body);

    res.status(201).json({
      message: "(Patient) Successful Insertion",
      body: patient,
    });
  }
  catch (err) {
    if (err.name === `SequelizeUniqueConstraintError`) {
      res.status(400).json({
        message: "(Patient) Unsuccessful Insertion: Existing Patient"
      });
    }
    else {
      res.status(500).json({
        message: "(Patient) Unsuccessful Insertion"
      });
    }
  }
});

module.exports = router;