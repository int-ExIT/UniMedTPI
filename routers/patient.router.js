const router = require("express").Router();
const patientControler = require("../controls/patient.controler");
const answer = require("../logs/answers");

router.get("/patient", (req, res) => {
  res.status(200).render("patient", {
    title: "UniMed-Reception",
    scripts: [
      "../public/scripts/dataCollector.js",
      // Script DataTables
      // "cdn.datatables.net/2.3.1/js/dataTables.min.js",
    ],
    styles: [
      "../public/styles/patient.css",
      // Style DataTables
      // "cdn.datatables.net/2.3.1/css/dataTables.dataTables.min.css",
    ],
  });
});

// ----------------------------------------------- CRUD Patient ---
router.get("/patient/all", async (req, res) => {
  try {
    const patients = await patientControler.selectAll();

    answer.success(res, 200, "(Patient) Successful Selections", patients);
  }
  catch (err) {
    answer.error(res, 500, `(Patient) Unsuccessful Selections ${err}`);
  }
});

router.post("/patient/dni", async (req, res) => {
  try {
    const patient = await patientControler.selectOne(req.body.dni);

    answer.success(res, 200, "(Patient) Successful Selection", patient);
  }
  catch (err) {
    answer.error(res, 500, `(Patient) Unsuccessful Selection ${err}`);
  }
});

router.post("/patient", async (req, res) => {
  try {
    const patient = await patientControler.insert(req.body);

    answer.success(res, 201, "(Patient) Successful Insertion", patient);
  }
  catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      answer.error(res, 400, "(Patient) Unsuccessful Insertion: Existing Patient");
    }
    else {
      answer.error(res, 500, `(Patient) Unsuccessful Insertion ${err}`);
    }
  }
});

module.exports = router;