const express = require("express");
const router = express.Router();
const URLS = require("../../model/URLS");

router.get("/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const stats = await URLS.findOne({ shortUrl_id: hash });
    res.json(stats);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
