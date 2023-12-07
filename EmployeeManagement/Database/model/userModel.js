const mongoose = require("mongoose");
const validator = require("validator");
const fs = require("fs");
const path = require("path");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        maxlength : 50,
        required : true
    },

    mobile : {
        type : String,
        unique : true,
        required : true,
        validate:{
            validator : function(mobile){
                return validator.isMobilePhone(mobile, "any", {strictMode : false})
            },
            message : "Invalid Mobile Number"
        }
    },

    email : {
        type : String,
        unique : true,
        required : true,
        validate :[validator.isEmail, "Invalid Email"]
    },

    password : {
        type : String,
        required : [true, "Set a Pasword"]
    },

    confirmPassword : {
        type : String
    },

    activity : {
        type : Boolean,
        default : true
    }
});


userSchema.post("save", function(doc, next){
    const targetPath = path.join(__dirname, "../../Log/log.txt")
    const content = `User SginUp  UserNmae ${doc.name}`;
    let logTxt = fs.writeFileSync(targetPath, content, {flag : "a"})
    console.log(logTxt);
    next()
})

module.exports = new mongoose.model("user", userSchema, "user");
