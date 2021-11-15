const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const shortenRouter = require("./routers/shortUrl/shortenRouter");
const extendRouter = require("./routers/extendUrl/extendRouter");
const statsRouter = require("./routers/statistics/statsRouter");
const Users = require("./model/users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const secret = process.env.SECRET;

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.resolve("./front-end")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./front-end/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("./front-end/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve("./front-end/register.html"));
});

app.post("/signup", (req, res) => {
  req.on("data", async (data) => {
    try {
      const info = JSON.parse(data);
      const { email, password } = info;
      const newUser = new Users({ email, password });
      await Users.insertMany([newUser]);
      res.send("./front-end/login.html");
    } catch (error) {
      res.status(403).json("The Email you've entered is taken");
    }
  });
});

app.get("/page", (req, res) => {
  res.sendFile(path.resolve("./front-end/page.html"));
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
    res.cookie("token", token);
    res.send("/page");
    // console.log(path.resolve("./front-end/page.html"));
    // res.sendFile(path.resolve("./front-end/page.html"));
  } else {
    res.status(404).json("The Email does not match the password");
  }
});

// app.use((req, res, next) => {
//   const { cookies } = req;
//   if (!cookies.token) return res.sendStatus(500);
//   jwt.verify(cookies.token, secret, (err, user) => {
//     if (err) return res.sendStatus(403);
//     next();
//   });
// });
app.use("/shorten", shortenRouter);
app.use("/original", extendRouter);
app.use("/statistic", statsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
