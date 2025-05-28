const router = require("express").Router();

// ----------------------------------------------- RENDER Login ---
router.get("/", (req, res) => {
  res.status(200).render("index", {
    title: "UniMed",
    scripts: [
      "../public/scripts/verify.js",
    ],
    styles: [
      "../public/styles/login.css",
    ],
  });
});

// ------------------------------------------------- CRUD Login ---

module.exports = router;