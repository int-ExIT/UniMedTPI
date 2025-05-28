const CONTROLLER = require("../controls/patient.controler");
const router = require("express").Router();

// --------------------------------------------- RENDER Patient ---
router.get("/", (req, res) => {
  res.status(200).render("patient", {
    title: "UniMed-Reception",
    scripts: [
      // Script jQuery (Necesario para DataTables)
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
      // Script DataTables
      "https://cdn.datatables.net/2.3.1/js/dataTables.min.js",
      // Script Bootstrap
      // "https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js",
      // Scripts genericos
      "../public/scripts/patient/patient.js",
      "../public/scripts/dataCollector.js",
    ],
    styles: [
      // Style DataTables
      "https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.min.css",
      // Style Bootstrap
      // "https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css",
      // Styles genericos
      "../public/styles/patient.css",
    ],
  });
}); // ACHICAR ESTE METODO

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:dni", CONTROLLER.selectOne);

router.get("/get-all", CONTROLLER.selectAll);

router.put("/:id", CONTROLLER.update);

router.delete("/:id", CONTROLLER.remove);

module.exports = router;