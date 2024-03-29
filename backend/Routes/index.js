const express = require('express');
const router = express.Router();
const userRoutes = require('./UserRouter');
const accountRouter = require('./AccountRouter')

router.use('/user',userRoutes);
router.use('/account',accountRouter);





module.exports = router;