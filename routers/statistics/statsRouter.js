const express = require("express");
const Database = require("../classes");
const router = express.Router();

router.get("/:hash", (req, res) => {
  try {
    const { hash } = req.params;
    const stats = Database.getStats(hash);
    res.json(stats);
  } catch (error) {
    res.status(404).send("page not found");
  }
});

module.exports = router;
