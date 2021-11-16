const express = require("express");
const URLS = require("../../model/URLS");
const router = express.Router();

router.get("/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const result = await URLS.findOne({ shortUrl_id: hash });
    let { counter, URL } = result;
    counter++;
    await URLS.findOneAndUpdate({ shortUrl_id: hash }, { counter });
    res.redirect(URL);
  } catch (error) {
    res.redirect("/404");
  }
});
module.exports = router;
