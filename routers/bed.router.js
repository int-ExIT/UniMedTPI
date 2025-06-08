const CONTROLLER = require("../controls/bed.controler");
const router = require("express").Router();

// --------------------------------------------- RENDER Patient ---

// ----------------------------------------------- CRUD Patient ---
router.post("/new", CONTROLLER.insert);

router.get("/get-one/:room_number", CONTROLLER.selectOne);

router.get("/get-all/:tipo_habitacion", CONTROLLER.selectAll);

router.get("/get-all", CONTROLLER.selectAll);

router.put("/:room_number", CONTROLLER.update);

router.delete("/:room_number", CONTROLLER.remove);

module.exports = router;