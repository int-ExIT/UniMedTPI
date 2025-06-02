const CONTROLLER = require("../controls/patient.controler");
const router = require("express").Router();

// --------------------------------------------- RENDER Patient ---
router.get("/", (req, res) => {
  res.status(200).render("patient", {
    title: "UniMed-Reception",
    scripts: [
      "../public/scripts/patient/patient.js",
      "../public/scripts/dataCollector.js",
    ],
    styles: [
      "../public/styles/patient.css",
    ],
  });
}); // ACHICAR ESTE METODO

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:dni", CONTROLLER.selectOne);

router.get("/get-all/:dni", CONTROLLER.selectAll);

router.get("/get-all", CONTROLLER.selectAll);

router.put("/:id", CONTROLLER.update);

router.delete("/:id", CONTROLLER.remove);

module.exports = router;