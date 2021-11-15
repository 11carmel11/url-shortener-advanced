const express = require("express");
const router = express.Router();
const URLS = require("../../model/URLS");

router.get("/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const stats = await URLS.findOne({ URL: hash });
    res.json(stats);
  } catch (error) {
    res.status(404).send("page not found");
  }
});

module.exports = router;
