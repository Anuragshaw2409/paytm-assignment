const express = require('express');
const authMiddleware = require('../Middlewares/AuthMiddleware');
const router = express.Router();
const z = require('zod');
const mongoose = require('mongoose');
const Account = require('../Schemas/AccountSchema');

router.post('/', authMiddleware, async (req, res) => {
    const transferSchema = z.object({
        to: z.string(),
        amount: z.number()
    })
    if (!transferSchema.safeParse(req.body).success) {
        return res.json({ message: "Invalid input" }).status(400);
    }
    const currentSession = await mongoose.startSession();
    currentSession.startTransaction();
    
    try {
        const to = req.body.to;
        const amount = req.body.amount;
    
        const fromUser = await Account.findOne({ userId: req.userId }).session(currentSession);
        const toUser = await Account.findOne({ userId: to }).session(currentSession);
        if (!toUser) {
            await currentSession.abortTransaction();
            return res.status(400).json({message:"Invalid Account"});
        }
        
        if(amount>fromUser.balance){
            await currentSession.abortTransaction();
            return res.status(400).json({message:"Insufficient Balance"});
            
        }
    
        await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(currentSession);
        await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(currentSession);
        await currentSession.commitTransaction();
        return res.json({message:"Transaction Successful"})


    } catch (error) {
        await currentSession.abortTransaction();
        return res.json({message:"Transaction Failed", error: error.message}).status(400);
    }

});
module.exports = router;
