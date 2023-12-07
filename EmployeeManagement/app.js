const express = require("express");
require("./Database/db-config.js");
const authRouter = require("./Router/authRouter.js");
const employeeRouter = require("./Router/employeeRouter.js");
const CustomError = require("./utils/customError.js");
const globalErrorHandler = require("./Controller/globalErrorController.js");

const app = express();

app.use(express.json());

// app.use(express.static("./views"))

app.set("views engine", "ejs");

app.route("/").get((req, resp)=>{
    resp.render("./Template/index.ejs")
})

app.use("/api/v1/user", authRouter);
app.use("/api/v1/employees", employeeRouter);

app.all("*", (req, resp, next)=>{
    const error = new CustomError(`yah url ${req.originalUrl} sahi nhi hai.`, 400);
    next(error);
});

app.use(globalErrorHandler);

module.exports = app;