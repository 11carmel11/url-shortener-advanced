const express = require("express");
const Database = require("../classes");
const router = express.Router();
router.post("/", (req, res) => {
  req.on("data", (data) => {
    const url = JSON.parse(data);
    const shortUrl = new Database(url);
    res.send(shortUrl);
  });
});
module.exports = router;
