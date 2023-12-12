const express = require("express");
const authController = require("../Controller/authController.js");
const { authVerify } = require("../Controller/authVerification.js");
const {uploadFile } = require("../middleware/userFiles.js");
const {sendEmail} = require("../middleware/emailSender.js");

const Router = express.Router();

Router.route("/signup").post(authController.signUp, sendEmail);
Router.route("/login").post(authController.logIn, sendEmail);
Router.route("/get").get(authVerify, authController.getUserByEmail);
Router.route("/update/profile-photo").put(authVerify, uploadFile, authController.set_Profile_Photo);
Router.route("/update/:id").put(authVerify, authController.updateProfile);
Router.route("/logout").delete(authVerify, authController.logOut);
Router.route("/buysubscriber").patch(authVerify, authController.buySubscribe);

module.exports = Router;
