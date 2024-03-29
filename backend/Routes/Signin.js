const express = require('express');
const router = express.Router();
const z =require('zod');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const User = require('../Schemas/UserSchema');



router.post('/', async (req, res) => {

    const data = req.body;
    const signinSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    if (signinSchema.safeParse(data).success) {
        const currentUser = await User.findOne({ email: data.email });
        if (currentUser) {
            if (currentUser.password == data.password) {
                console.log(currentUser);
                const payload = { userId: currentUser._id };
                const token = JWT.sign(payload, JWT_SECRET);

                return res.json({ message:"Login Successful" ,success: true, token });
            }

            return res.json({ success: false, message: "Invalid Credentials" });
        }
        else
            return res.json({ success: false, message: "User does not exist" });




    }
    return res.json({message:"Enter fields correctly", success: false});

});
module.exports = router;