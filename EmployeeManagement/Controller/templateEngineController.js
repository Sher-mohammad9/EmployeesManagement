const asyncErrorHandler = require("../utils/asyncErrorHandler");
const path = require("path");


exports.homePage = asyncErrorHandler(async(req, resp, next)=>{
            const filePath = path.join(__dirname, ".././views/Template/index.ejs");
            resp.render(filePath)
});

exports.userSignUp = asyncErrorHandler(async(req, resp, next)=>{
    const filePath = path.join(__dirname, ".././views/Template/userForm.ejs");
    resp.render(filePath)
})