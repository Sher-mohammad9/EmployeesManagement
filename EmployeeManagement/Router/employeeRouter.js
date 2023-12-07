const express = require("express");
const employeeController = require("../Controller/employeeController.js");
const authVerify = require("../Controller/authVerification.js");


const Router = express.Router();

Router.route("/create").post(authVerify.authVerify,  employeeController.createEmployee)
Router.route("/get").get(authVerify.authVerify,  employeeController.getAllEmployee);
Router.route("/update/:id").put(authVerify.authVerify, employeeController.updateEmployee);
Router.route("/delete/:id").delete(authVerify.authVerify, employeeController.deleteEmployee);

module.exports = Router;