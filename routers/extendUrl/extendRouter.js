const express = require("express");
const URLS = require("../../model/URLS");
const router = express.Router();

router.get("/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const result = await URLS.findOne({ shortUrl_id: hash });
    const { counter } = result;
    counter++;
    const { URL } = await URLS.findOneAndUpdate(
      { shortUrl_id: hash },
      { counter }
    );
    res.redirect(URL);
  } catch (error) {
    res.status(404).send("page not found");
  }
});
module.exports = router;
