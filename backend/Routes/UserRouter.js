const express = require('express');
const router = express.Router();
const signin = require('./Signin');
const signup = require('./Signup');
const Userupdate = require('./Userupdate');
const Bulk = require('./Bulk');

router.use('/signin',signin);
router.use('/signup',signup);
router.use('/userupdate', Userupdate);
router.use('/bulk',Bulk);

router.get('/', (req, res) => {
    return res.json("Hello from backend");
})

router.use((err, req, res, next) => {
    return res.json("Something bad happened");
})

module.exports = router;