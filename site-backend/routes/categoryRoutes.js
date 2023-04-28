const express = require('express');
const { Category, validateCategory } = require('../models/category');
const router = express.Router();

router.get("/", async (req, res) => {
    try {

        let result = []

        const categories = await Category.find({
            parent: {
                $exists: false
            }
        }).exec();

        for (const category of categories) {
            result.push({
                _id: category._id,
                title: category.title,
                slug: category.slug,
                children: await findCategoryChildren(category._id)
            })
        }

            const filters = req.query;
            result = result.filter(cat => {
              let isValid = true;
              for (key in filters) {
                // console.log(key, cat[key], filters[key]);
                isValid = isValid && cat[key] == filters[key]
              }
              return isValid;
            });
          

        res.send({
            message: "Categories indexed successfully.",
            data: result
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});

const findCategoryChildren = async (categoryId) => {

    const result = []

    const categories = await Category.find({
        parent: categoryId
    }).exec();

    for (const category of categories) {
        result.push({
            _id: category._id,
            title: category.title,
            slug: category.slug,
            children: await findCategoryChildren(category.id)
        })
    }

    return result
}

router.get('/:id',async(req,res)=>{
    try{
    const category = await Category.findById(req.params.id);
    if(!category){return res.status(400).send('not found')};
    return res.status(200).send(category);
    }
    catch(error){
        res.status(400).send({
            message: error.message
        })
    }
});

router.post('/',async(req,res)=>{
    const result = validateCategory(req.body);
    if(!result){return res.status(400).send('joi validation error')};

    let category = new Category({
        title:req.body.title,
        parent:req.body.parent
    });

    category =await category.save();
    res.status(200).send(category);
});

router.put('/:id',async(req,res)=>{
    let category = await Category.findById(req.params.id);
    if(!category){return res.send(400).send('not found')};

    const result = validateCategory(req.body);
    if(!result){return res.status(400).send('joi validation error')};

    category =await Category.findByIdAndUpdate(req.params.id,{title : req.body.title},{new:true});
    res.status(200).send(category);
});

router.delete('/:id',async(req,res)=>{
    let category = await Category.findById(req.params.id);
    if(!category){return res.send(400).send('not found')};

    category =await Category.findByIdAndRemove(req.params.id);
    res.status(200).send(category);
});

module.exports = router;