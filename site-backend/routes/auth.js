const express = require('express');
const router = express.Router();
const {validateLoginEmail,User} = require('../models/user');
// const call_ghasedak = require("../ghasedakSMS")
const redis = require('redis');

const client = redis.createClient(6379,'127.0.0.1')
client.connect() 
    .then(()=>console.log('connected to redis...'))
    .catch('error', (err) => console.log('could not connect to redis...',err))

router.post('/verifyemail',async(req,res)=>{
    const {error} = validateLoginEmail(req.body)
    if(error){return res.status(400).send('invalid email')}

    let user = await User.findOne({email:req.body.email})
    if(!user){return res.status(400).send('invalid username')}

    const code = Math.floor(Math.random() * (900000) + 100000)

    console.log(await client.set(req.body.email,code))
    await client.expire(req.body.email, 30)
    console.log(await client.get(req.body.email))
    
    // call_ghasedak(code,user.phone)
    res.status(200).send('verified')
})

router.post('/verifyotp',async(req,res)=>{

    let user = await User.findOne({email:req.body.email})
    if(!user){return res.status(400).send('invalid username')}

    const code = await client.get(req.body.email)
    if(!req.body.otpCode===code){return res.status(400).send('invalid code')}

    const token = user.generateToken()
    res.send(token)
})


module.exports = router;