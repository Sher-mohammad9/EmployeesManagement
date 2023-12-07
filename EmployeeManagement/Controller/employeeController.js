const employeeModel = require("../Database/model/employeeSchema.js");
const CustomError = require("../utils/customError.js");
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const ApiFeature = require("../utils/ApiFeature.js");

exports.createEmployee = asyncErrorHandler(async(req, resp, next)=>{
    const newEmployee = req.body;
    const addNewEmployee = await employeeModel.create(newEmployee);

    resp.status(201).json({
        status : "Success",
        message : "Successfully add employee",
        employee : addNewEmployee
    });
})

exports.getAllEmployee = asyncErrorHandler(async(req, resp ,next)=>{
    const data  = new ApiFeature(employeeModel.find(), req.query);
    const employeeData = await data.query;
    if(employeeData.length <= 0){
      const error = new CustomError("Record not found database is empty", 404);
      return next(error);
    }

    resp.status(200).json({
        status : "Success",
        employeeData,
    })
})


exports.updateEmployee = asyncErrorHandler(async(req, resp, next)=>{
    const {id} = req.params;
    let existsEmployee = await employeeModel.findById(id);
    if(!existsEmployee){
        const error = new CustomError("Employee not found", 404);
        return next(error)
    }
    
    await employeeModel.findByIdAndUpdate(id, {$set : req.body});
    existsEmployee = await employeeModel.findById(id)
 
     resp.status(200).json({
        status : "Success",
        updateEmployee : existsEmployee,
     })

});

exports.deleteEmployee = asyncErrorHandler(async(req, resp, next)=>{
    const {id} = req.params
    const existsEmployee = await employeeModel.findById(id);
    if(!existsEmployee){
       const error = new CustomError("Employee not found", 404);
       return next(error)
    }
    await employeeModel.findByIdAndDelete(id)
    resp.status(200).json({
        status : "Success",
        message : "Delete employee"
    })
})