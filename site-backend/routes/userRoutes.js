const express = require('express');
const { validateUser, User } = require('../models/user');
const router = express.Router();
const _ = require('lodash')


router.get('/',async(req,res)=>{
    const users = await User.find();
    res.status(200).send(users);
});

router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){return res.status(400).send(user)}
    res.status(200).send(user)
})

router.post('/',async(req,res)=>{
    const result = validateUser(req.body);
    if(!result){return req.status(404).send('joi validation error')};

    let user =await User.findOne({email:req.body.email})
    if(user){return res.status(400).send('already registered')}

    user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin
    });
    
    user =await user.save();
    const token = user.generateToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','phone','email']));
});


module.exports = router;