const express = require('express');
const router = express.Router();
const z = require('zod');
const User = require('../Schemas/UserSchema');
const authMiddleware = require('../Middlewares/AuthMiddleware');


router.post('/', authMiddleware, async (req, res) => {

    const updateBody = z.object({
        password: z.string().min(8, { message: "Must be 8 characters" }).optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional()

    });

    const { success, error } = updateBody.safeParse(req.body);
    if (!success)
        return res.json({ message: "Cannot update information", error: error.issues[0].message }).status(411);


    try {
        const updatedUSer = await User.findByIdAndUpdate({ _id: req.userId }, req.body);
        if (updatedUSer) {
            return res.json({ message: "Information updated successfuly", user: updatedUSer });
        }

    } catch (error) {
        return res.json({ message: "Could not update information" }).status(411);

    }


});
module.exports = router;