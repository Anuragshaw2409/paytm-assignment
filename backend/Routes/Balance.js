const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/AuthMiddleware');
const Account = require('../Schemas/AccountSchema');



router.get('/',authMiddleware, async(req,res)=>{

    try {
        const userId = req.userId;
        const userAccount = await Account.findOne({userId});
        return res.json({balance: userAccount.balance});
        
    } catch (error) {
        return res.json({message: "Cannot get Balance", error: error.message})
    }




})


module.exports = router;