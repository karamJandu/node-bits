const bcrypt = require("bcrypt");
const User = require("../models/User");
const saltRound = process.env.BCRYPT_SALT_ROUND;

const addUser = async (req, res) => {
  const { email, password } = req.body;
  if (email === null || password === null) {
    res.status(400).json({ message: "Both email and password are required" });
    return;
  }
  if (password.trim().length < 8) {
    res
      .status(400)
      .json({ message: "Password should be eight or more characters" });
    return;
  }
  if (email.trim().length == 0) {
    res.status(400).json({ message: "Email cannot be empty" });
    return;
  }

  const checkUser = await User.findOne({ email });
  if (checkUser !== null) {
    res.status(401).json({ message: "User with email already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(Number(saltRound));
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ email: email, password: hashedPassword });

  if (user === null) {
    res.status(500).send({ message: "Could not add user" });
    return;
  }
  res.status(200).json(user);
};

const getUsers = async (req, res) => {
  const users = await User.find();
  if (users === null) {
    res.status(500).json({ message: "Could not find users" });
    return;
  }
  res.status(200).json(users);
};

module.exports = { addUser, getUsers };
