const express = require(`express`);

const router = express.Router();

router.get(`/`, (req, res) => {
  res.render(`index`, {
    title:"UniMed", 
    script:"../public/scripts/verify.js"
  });
});

module.exports = router;