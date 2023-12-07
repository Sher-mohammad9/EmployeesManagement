const express = require("express");
const authController = require("../Controller/authController.js");
const authVerify = require("../Controller/authVerification.js");

const Router = express.Router();

Router.route("/signup").post(authController.signUp);
Router.route("/login").post(authController.logIn);
Router.route("/update/:id").put(authVerify.authVerify, authController.updateProfile);
Router.route("/logout").put(authVerify.authVerify, authController.logOut);

module.exports = Router;