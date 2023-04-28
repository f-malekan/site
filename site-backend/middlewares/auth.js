const jwt = require("jsonwebtoken");

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){return res.status(401).send('No Token Provided')}
    try{
        const decode = jwt.decode(token)
        req.user = decode;
        next();
    }
    catch(ex){res.status(400).send('Invalid Token')}
}

module.exports = auth;