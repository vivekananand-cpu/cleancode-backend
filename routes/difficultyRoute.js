const express = require('express');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const { createDifficulty, getDifficulties } = require('../controller/difficulty');
const { getUserById } = require('../controller/user');
const router = express.Router();

router.param('userId',getUserById);
router.post('/difficulty/create/:userId',isLoggedIn,isAuthenticated,isAdmin,createDifficulty);
router.get('/difficulties/:userId',isLoggedIn,isAuthenticated,isAdmin,getDifficulties);

module.exports = router;