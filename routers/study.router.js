const CONTROLLER = require("../controls/study.controler");
const router = require("express").Router();

// --------------------------------------------- RENDER Patient ---

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:patient_dni", CONTROLLER.selectOne);

router.get("/get-all/:patient_dni", CONTROLLER.selectAll);

router.get("/get-all", CONTROLLER.selectAll);

router.put("/:patient_dni", CONTROLLER.update);

router.delete("/:patient_dni", CONTROLLER.remove);

module.exports = router;