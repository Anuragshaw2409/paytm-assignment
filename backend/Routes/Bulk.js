const express = require('express');
const router = express.Router();
const z =require('zod');
const User = require('../Schemas/UserSchema');
const authMiddleware = require('../Middlewares/AuthMiddleware');


router.get('/',async(req,res)=>{
    const filter = req.query.filter || "";

    
    const users =await User.find({
        $or:[
            {firstName: {"$regex":filter,"$options": "i"}},
            {lastName:{"$regex":filter,"$options": "i"}}

        ]
    });

    const filteredUsers = users.map((user)=>
        ({
            "firstName": user.firstName,
            "lastName": user.lastName,
            "userId": user._id
        })

    )
    return res.json(filteredUsers);

    


})


module.exports = router;