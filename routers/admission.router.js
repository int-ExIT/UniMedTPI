const CONTROLLER = require("../controls/admission.controler");
const router = require("express").Router();

// --------------------------------------------- RENDER Patient ---
router.get("/", (req, res) => {
  res.status(200).render("admission", {
    title: "UniMed-Reception",
    scripts: [
      "../public/scripts/patient/admission.js",
      "../public/scripts/dataCollector.js",
    ],
    styles: [
      "../public/styles/admission.css",
    ],
  });
});

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:patient_dni", CONTROLLER.selectOne);

router.get("/get-all/:patient_dni/:filter", CONTROLLER.selectAll);

router.put("/:patient_dni", CONTROLLER.update);

router.delete("/:patient_dni", CONTROLLER.remove);

module.exports = router;