const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:255,
    },
    email:{
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        minlength:11,
        maxlength:11
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:true
    }
});


function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(255),  
        email:Joi.string().min(5).max(255).required().email(),
        phone:Joi.string().min(11).max(11).required(),
        isAdmin:Joi.boolean().required()
    });
        
        const validation = schema.validate(user); 
        return validation;
};

function validateLoginEmail(email){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).email()
    });
        
        const validation = schema.validate(email); 
        return validation;
};

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin}, process.env.jwtPrivateKey)
    return token;
}


const User = mongoose.model('User',userSchema);


module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLoginEmail = validateLoginEmail;