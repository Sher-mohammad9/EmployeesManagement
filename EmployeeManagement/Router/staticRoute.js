const templateEngineController = require("../Controller/templateEngineController.js");
const {authVerify} = require("../Controller/authVerification.js");

const express = require("express");
const Router = express.Router();

Router.route("/").get(templateEngineController.homePage);

Router.route("/signup/page").post(templateEngineController.userSignUp)

module.exports = Router;