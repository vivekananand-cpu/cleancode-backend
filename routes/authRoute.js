const express = require('express');
const { signup, signin, signout, isLoggedIn } = require('../controller/auth');
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.get('/test',isLoggedIn,(req,res)=>{
    res.json(req.auth);
});

module.exports = router;