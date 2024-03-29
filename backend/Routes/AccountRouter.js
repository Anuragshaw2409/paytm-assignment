const express = require('express');
const router = express.Router();
const Balance = require('./Balance');
const Transfer = require('./Transfer');

router.use('/balance',Balance);
router.use('/transfer',Transfer);





module.exports = router;