const CONTROLLER = require("../controls/patient.controler");
const router = require("express").Router();

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:dni", CONTROLLER.selectOne);

router.get("/get-all/:dni", CONTROLLER.selectAll);

router.get("/get-all", CONTROLLER.selectAll);

router.put("/:dni", CONTROLLER.update);

router.delete("/:dni", CONTROLLER.remove);

module.exports = router;