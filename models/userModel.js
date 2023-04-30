const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [ true , ' kindly enter your name '] , 
        maxLen : [ 30 , ' name cannot be grater than 30 '], 
    } , 
    email : {
        type : String , 
        required : [true , 'Enter Your Email'] , 
        maxLen : [ 60 , 'Email cannot be grater than 60'] ,
        validate :[validator.isEmail , "Please Enter your Email"] ,
    } , 
    password :{
        type : String , 
        required : [ true , 'Enter Password'] , 
        minLen : [ 4 , 'Enter password more than 4 words'] , 
        select : false ,
    } , 
    maxScore :{
        type : Number , 
        default : 0 ,
        required : false ,
    } , 
    joinedSince :{
        type : Date , 
        default : Date.now , 
        required : false
    } , 
    totaljumps :{
        type : Number , 
        default : 0 ,
        required : false ,
    } ,
    practiseSeconds :{
        type : Number , 
        default : 0 ,
        required : false ,
    } ,
    friends : [
        {
            public_id : {
                type : String , 
                required : false
            }
        }
    ] , 

    resetPasswordToken : String , 
    resetPasswordExpire : Date , 
})

//Before Save encrypt 
userSchema.pre('save' ,async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password , this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign( {id : this._id} , process.env.JWT_SECRET , { expiresIn : process.env.JWT_EXPIRE }  )
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}



module.exports = mongoose.model("User" , userSchema );