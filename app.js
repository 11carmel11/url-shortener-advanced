const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const shortenRouter = require("./routers/shortUrl/shortenRouter");
const extendRouter = require("./routers/extendUrl/extendRouter");
const statsRouter = require("./routers/statistics/statsRouter");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./front-end/index.html"));
});
app.use("/", express.static(path.resolve("./front-end")));
app.use("/shorten", shortenRouter);
app.use("/original", extendRouter);
app.use("/statistic", statsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
