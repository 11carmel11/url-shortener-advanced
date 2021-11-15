const express = require("express");
const URLS = require("../../model/URLS");
const router = express.Router();

router.post("/", (req, res) => {
  req.on("data", (data) => {
    const URL = JSON.parse(data);
    const short = new URLS({ URL }).save().then((result) => {
      res.send(res.send(result));
    });
  });
});
module.exports = router;
