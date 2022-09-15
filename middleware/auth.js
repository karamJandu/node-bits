const jwt = require("jsonwebtoken");
const User = require("../models/User");

const test = (req, res, next) => {
  console.log(req.headers.authorization);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1]
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "jwtSecret", async (err, decode) => {
      if (err) return;
      const user = await User.findById(decode.user._id);
      if (!user) return;
      next();
    });
  } else {
    res.json({ message: "Unauthorized" });
  }
  console.log("I am test middleware");
  next();
};

module.exports = test;
