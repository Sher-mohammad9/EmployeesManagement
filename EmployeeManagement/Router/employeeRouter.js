const express = require("express");
const employeeController = require("../Controller/employeeController.js");
const {
  authVerify,
  subAuthVerify,
} = require("../Controller/authVerification.js");


const Router = express.Router();

const subRouter = express.Router();

Router.route("/create").post(authVerify, employeeController.createEmployee);
Router.route("/get").get(authVerify, employeeController.getAllEmployee);
Router.route("get/:id").get(authVerify, employeeController.getEmployeeById);
Router.route("/search/anyfield/:value").get(authVerify, employeeController.searchEmployees);
Router.route("/search/name/:value").get(authVerify, employeeController.searchEmployeesByName);
Router.route("/search/email/:value").get(authVerify, employeeController.searchEmployeesByEmail);
Router.route("/search/address/:value").get(authVerify, employeeController.searchEmployeesByAddress);
Router.route("/search/mobile/:value").get(authVerify, employeeController.searchEmployeesByMobile);
Router.route("/update/:id").put(authVerify, employeeController.updateEmployee);
Router.route("/delete/:id").delete(
  authVerify,
  employeeController.deleteEmployee
);

//Subscribe User Router
Router.use("/subscribe", subRouter);

subRouter.route("/paysalary").get(subAuthVerify, employeeController.paySalary);
subRouter.route("/rights").get(subAuthVerify, employeeController.getEmployeeRights);
subRouter.route("/highest-salary-employee").get(subAuthVerify, employeeController.highest_Salary_Employees);
subRouter.route("/salary-categary-employees").get(subAuthVerify, employeeController.salary_Categary_Employees);



module.exports = Router;
