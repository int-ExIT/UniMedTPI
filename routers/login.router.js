const router = require(`express`).Router();

router.get(`/`, (req, res) => {
  res.status(200).render(`index`, {
    title: "UniMed",
    script: "../public/scripts/verify.js",
    styles: "../public/styles/login.css",
  });
});

module.exports = router;