const express = require("express");
require("./Database/db-config.js");
const authRouter = require("./Router/authRouter.js");
const employeeRouter = require("./Router/employeeRouter.js");
const salaryRouter = require("./Router/salaryRouter.js");
const rightsRouter = require("./Router/rightsRouter.js");
const CustomError = require("./utils/customError.js");
const globalErrorHandler = require("./Controller/globalErrorController.js");
const staticRoute = require("./Router/staticRoute.js");
const path = require("path")

const app = express();

app.use(express.urlencoded({extended : false}))
app.use(express.json());


app.use(express.static("./views"))
app.set("view engine", "ejs");

//HTML File Render
app.use("/home", staticRoute)

app.use("/api/v1/user", authRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/salary", salaryRouter);
app.use("/api/v1/rights", rightsRouter);

app.all("*", (req, resp, next) => {
  const error = new CustomError(
    `yah url ${req.originalUrl} sahi nhi hai.`,
    400
  );
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
