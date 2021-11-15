const express = require("express");
const router = express.Router();
const Database = require("../classes");
router.get("/:hash", (req, res) => {
  try {
    const { hash } = req.params;
    const URL = Database.prepareToRedirect(hash);
    res.redirect(URL);
  } catch (error) {
    res.status(404).send("page not found");
  }
});
module.exports = router;
