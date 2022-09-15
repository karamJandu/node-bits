const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.addUser);

module.exports = router;
