const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const { Category } = require('../models/category');
const { validatePost, Post } = require('../models/post');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const jwt = require("jsonwebtoken");


router.post('/',[auth,isAdmin],async(req,res)=>{


    const list = req.body.categoryId
    for (let i=0;i<list.length;i++){
        let category =await Category.findById(list[i]);
        if(!category){return res.status(400).send('category not found')};
    };
    

    const result = validatePost(req.body);
    if(!result){return res.status(400).send('joi validation error')};



    const token = req.header('x-auth-token');

        const decode = jwt.decode(token)
        const userId = decode._id;
    

    let post = new Post({
        title:req.body.title,
        subtitle:req.body.subtitle,
        user:userId,
        category:req.body.categoryId,
        content:req.body.content,
        readingtime:req.body.readingtime
    })    

    post = await post.save()
    res.status(200).send(post)
})

router.put('/:id',async(req,res)=>{
    try{    
        let post =await Post.findById(req.params.id);
        if(!post){return res.status(404).send('post not found')};
    }
    catch(error){
        return res.status(404).send(error.message)
    }

    try{
        const user =await User.findById(req.body.userId);
        if(!user){return res.status(400).send('user not found')};
    }
    catch(error){
        return res.status(404).send(error.message)
    }

    const list = req.body.categoryId
    for (let i=0;i<list.length;i++){
        try{
            let category =await Category.findById(list[i]);
            if(!category){return res.status(400).send('category not found')};
        }
        catch(error){
            return res.status(404).send(error.message)
        }
    };

    const result = validatePost(req.body);
    if(!result){return res.status(400).send('joi validation error')};

    let post = await Post.updateOne({_id:req.params.id},{
        $set:{
            title:req.body.title,
            subtitle:req.body.subtitle,
            user:req.body.userId,
            category:req.body.categoryId,
            content:req.body.content,
            readingtime:req.body.readingtime
        }
    });

    res.status(200).send(post)

});

router.get('/',async(req,res)=>{
    try{
        const posts = await Post.find();
        res.status(200).send(posts)
    }
    catch(error){res.send(error.message)}
})


module.exports = router;