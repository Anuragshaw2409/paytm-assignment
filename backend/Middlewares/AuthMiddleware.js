
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

function authMiddleware(req,res,next){
    if(!(req.headers.authorization)){
        return res.json({error:"Invalid token"}).status(403);
    }

    const token = req.headers.authorization;
    // console.log(JWT.verify(token, JWT_SECRET));
    try {
        
        req.userId = JWT.verify(token,JWT_SECRET).userId;
        next();
    } catch (error) {
        return res.json({message:"Inavalid Token"}).status(498);
    }


}

module.exports = authMiddleware;

