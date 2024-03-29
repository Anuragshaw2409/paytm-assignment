const express = require('express');
const router = express.Router();
const z =require('zod');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const User = require('../Schemas/UserSchema');
const Account = require('../Schemas/AccountSchema');


router.post('/', async (req, res) => {
    const userSchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(8, { message: "Pass must be atleast  8 chars" })

    });

    const data = req.body;
    if (userSchema.safeParse(data).success) {
        if (await User.findOne({ email: data.email }))
            return res.json({message:"Email already taken"}).status(411);

        try {

            const newUser = new User(data);
            newUser.save().then(() => {
                console.log("User Created Successfuly in mongo")
            });
            const payload = { userId: newUser._id };
            const token = JWT.sign(payload, JWT_SECRET);

            // Creating a wallet account with random balance.
            await Account.create({
                userId:newUser._id,
                balance: Math.random()*1000
            })
            .then(()=>console.log("Account created successfuly"))
            .catch((err)=>console.log(err.message));


            return res.json({ message:"Account Created Successfuly",success: true, token })
        }
        catch (error) {
            return res.json({ message: "Internal Error, User cannot be created", error: error.message });
        }




    }
    else
        return res.json({ "error": userSchema.safeParse(data).error }).status(411);


});

module.exports = router;