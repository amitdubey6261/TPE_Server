// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModels");
const ErrorHandler = require('../utils/errorHandler.js');
const catchAsyncError = require('./catchAsyncError.js');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')

// exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
//     // const {token} = req.cookies ;
//     // if(!token){
//     //     return next(new ErrorHandler("Please login To Acces this resource"));
//     // }
//     // const decodedData = jwt.verify(token,process.env.JWT_SECRET);
//     // req.user = await User.findById(decodedData.id);
//     // next(); 
// });

exports.isAuthenticateduser = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies ;
    if(!token){
        return next(new ErrorHandler("Please login To Acces this resource"));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next(); 
})