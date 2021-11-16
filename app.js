const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const shortenRouter = require("./routers/shortUrl/shortenRouter");
const extendRouter = require("./routers/extendUrl/extendRouter");
const statsRouter = require("./routers/statistics/statsRouter");
const logMiddleWare = require("./routers/middleWares/logMiddleWare");
const Users = require("./model/users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const secret = process.env.SECRET;

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.resolve("./front-end")));

app.use("/:currentPath", logMiddleWare);

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.post("/signup", (req, res) => {
  req.on("data", async (data) => {
    try {
      const info = JSON.parse(data);
      const { email, password } = info;
      const newUser = new Users({ email, password });
      await Users.insertMany([newUser]);
      res.send("/login");
    } catch (error) {
      res.status(403).json("The Email you've entered is taken");
    }
  });
});

app.get("/signin", async (req, res) => {
  const { password, email } = req.query;
  const user = await Users.findOne({ password, email });
  if (user) {
    const token = jwt.sign(
      { email: user.email, password: user.password },
      secret,
      {
        expiresIn: "300s",
      }
    );
    res.cookie("token", token, { maxAge: 300000 });
    res.send("/page");
  } else {
    res.status(400).json("The Email does not match the password");
  }
});

app.get("/name", (req, res) => {
  const { token } = req.cookies;
  const { email } = jwt.decode(token);
  res.send(email.split("@")[0]);
});

app.use("/shorten", shortenRouter);
app.use("/original", extendRouter);
app.use("/statistic", statsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
