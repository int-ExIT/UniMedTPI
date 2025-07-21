const CONTROLLER = require("../controls/login.controler");
const router = require("express").Router();

// --------------------------------------------------------- RENDER Login ---
router.get("/", (req, res) => {
  res.status(200).render("login", {
    title: "UniMed",
    scripts: [
      "../public/scripts/verify.js",
    ],
    styles: [
      "../public/styles/login.css",
    ],
  });
});

// ----------------------------------------------------------- CRUD Login ---
router.get("/:username/:password", CONTROLLER.selectOne);

module.exports = router;