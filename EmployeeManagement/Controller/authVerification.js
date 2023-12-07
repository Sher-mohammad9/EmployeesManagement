const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const config = require("../config.js");
const CustomError = require("../utils/customError");

exports.authVerify = asyncErrorHandler(async (req, resp, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    const tokenVerify = jwt.verify(token, config.SECRET_KEY);   
    if (tokenVerify) {
      next();
    } else {
      const error = new CustomError("Authentication Feild Token is not valid", 401);
      next(error);
    }
  } else {
    const error = new CustomError("Token is required", 400);
    next(error);
  }
});
