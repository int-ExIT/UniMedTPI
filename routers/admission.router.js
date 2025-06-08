const CONTROLLER = require("../controls/admission.controler");
const router = require("express").Router();

// --------------------------------------------- RENDER Patient ---

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:dni", CONTROLLER.selectOne);

router.get("/get-all/:dni", CONTROLLER.selectAll);

router.get("/get-all", CONTROLLER.selectAll);

router.put("/:dni", CONTROLLER.update);

router.delete("/:dni", CONTROLLER.remove);

module.exports = router;