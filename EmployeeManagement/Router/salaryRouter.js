const express = require("express");
const salaryController = require("../Controller/salaryController");
const { authVerify } = require("../Controller/authVerification");

const Router = express.Router();

Router.route("/add").post(authVerify, salaryController.addSalary);
Router.route("/get").get(authVerify, salaryController.getAllSalary);
Router.route("/get/:empId").get(authVerify, salaryController.getSalaryById);
Router.route("/update/:id").put(authVerify, salaryController.updateSalary);
Router.route("/delete/:id").delete(authVerify, salaryController.deleteSalary);

module.exports = Router;
