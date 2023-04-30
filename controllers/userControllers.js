const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncError');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.create(req.body);
    const token  = user.getJWTToken();
    res.status(201).cookie(
        'token',
        token,
        {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 60),
            httpOnly: true
        }
    ).json({
        success : true , 
        user , 
        token : token,
    })

})

exports.loginUser = catchAsyncErrors(async(req , res , next)=>{

    const { email , password } = req.body ;

    if( !email || !password ){
        return next(new ErrorHandler('Enter Email and Passwd ' , 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('User Not Exist' , 401 ));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid Password' , 401 ));
    }

    const token = user.getJWTToken();

    res.status(201).cookie(
        'token',
        token,
        {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 60),
            httpOnly: true
        }
    ).json({
        success : true , 
        user , 
        token : token,
    })

})

exports.logout = catchAsyncErrors(async(req , res , next )=>{
    const date = new Date(Date.now());
    res.cookie('token' , null , {
        expires : new Date(Date.now()) , 
        httpOnly : true ,
    })
    res.status(201).json({
        success : true , 
        message : 'logged Out'
    })

})

exports.getAllUsers = catchAsyncErrors(async( req , res , next )=>{

    const user = await User.find();
    
    res.status(201).json({
        success : true , 
        user 
    })
})

exports.getOneUser = catchAsyncErrors(async( req , res , next )=>{
    const user  = await User.findById(req.params.id) ; 

    if( !user ){
        return next( new ErrorHandler( ' User Not Found ' , 404 ));
    }

    res.status(201).json({
        success : true , 
        user
    })
})