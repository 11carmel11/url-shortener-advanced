const path = require("path");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const middleWare = (req, res, next) => {
  const { currentPath } = req.params;
  const existPath = [
    "login",
    "register",
    "page",
    "403",
    "404",
    "shorten",
    "statistic",
    "original",
    "signup",
    "signin",
    "498",
  ];
  if (!existPath.includes(currentPath)) return res.redirect("/404");
  const filePath = ["login", "register", "page", "403", "404", "498"];
  const needAuth = ["page", "shorten", "statistic"];
  if (needAuth.includes(currentPath)) {
    const { cookies } = req;
    if (!cookies.token) return res.redirect("/403");
    jwt.verify(cookies.token, secret, (err) => {
      if (err) return res.sendStatus(498);
    });
  }
  if (filePath.includes(currentPath)) {
    return res.sendFile(
      path.resolve(`./front-end/${currentPath}/${currentPath}.html`)
    );
  }
  next();
};

module.exports = middleWare;
