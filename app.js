const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const shortenRouter = require("./routers/shortUrl/shortenRouter");
const extendRouter = require("./routers/extendUrl/extendRouter");
const statsRouter = require("./routers/statistics/statsRouter");
const Users = require("./model/users");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./front-end/index.html"));
});
app.use("/", express.static(path.resolve("./front-end")));
app.use("/shorten", shortenRouter);
app.use("/original", extendRouter);
app.use("/statistic", statsRouter);

app.post("/signup", (req, res) => {
  req.on("data", async (data) => {
    const info = JSON.parse(data);
    const { email, password } = info;
    const newUser = new Users({ email, password });
    await Users.insertMany([newUser]);
    res.send(path.resolve("./front-end/login.html"));
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
