const CONTROLLER = require("../controls/patient.controler");
const router = require("express").Router();

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
router.get("/patient/all", CONTROLLER.selectAll);

router.post("/patient/dni", CONTROLLER.selectOne);

router.post("/patient", CONTROLLER.insert);

module.exports = router;