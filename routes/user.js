const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.signUp);

router.route("/login").post(userController.loginUser);

module.exports = router;
