const mongoose = require('mongoose');
const Joi = require('joi')

const categorySchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        minlength:2,
        maxlength:255
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
});


const Category = mongoose.model('Category',categorySchema);


function validateCategory(category){
    const schema = Joi.object({
        title:Joi.string().min(2).max(255).required()
    });  
        const validation = schema.validate(category); 
        return validation;
};


module.exports.Category = Category;
module.exports.categorySchema = categorySchema;
module.exports.validateCategory = validateCategory;