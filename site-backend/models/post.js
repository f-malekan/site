const mongoose = require('mongoose');
const Joi = require('joi')

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        minlength:5,
        maxlength:255
    },
    subtitle:{
        type: String,
        minlength:5,
        maxlength:255
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    }],
    content:{
        type:String,
        required:true,
    },
    readingtime:String
});


const Post = mongoose.model('Post',postSchema)


function validatePost(post){
    const schema = Joi.object({
        title:Joi.string().min(5).max(255).required(),
        subtitle:Joi.string().min(5).max(255).required(),
        userId:Joi.string().required(),
        categoryId:Joi.required(),
        content:Joi.required(),
        readingtime:Joi.string().min(5).max(255)
    })
        
        const validation = schema.validate(post); 
        return validation;
};
// اضافه کردن پست فقط با ادمین و آث

module.exports.postSchema = postSchema;
module.exports.Post = Post;
module.exports.validatePost = validatePost;