const CONTROLLER = require("../controls/admission.controler");
const router = require("express").Router();

// ------------------------------------------------------- RENDER Patient ---
router.get("/", (req, res) => {
  res.status(200).render("nurse", {
    title: "UniMed-Reception",
    scripts: [
      "../public/scripts/nurse.js",
      "../public/scripts/dataCollector.js",
    ],
    styles: [
      "../public/styles/table.css",
      "../public/styles/search.css",
      "../public/styles/nurse.css",
    ],
  });
});

// --------------------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:patient_dni", CONTROLLER.selectOne);

router.get("/get-all/:patient_dni/:filter", CONTROLLER.selectAll);

router.get("/get-all-users", CONTROLLER.selectAllUsers);

router.put("/:id", CONTROLLER.update);

router.delete("/:id", CONTROLLER.remove);

module.exports = router;