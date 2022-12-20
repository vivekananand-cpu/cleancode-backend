const express = require('express');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const { addQuetion, updateCompletedBy, getQuetionById, getAllQuetions } = require('../controller/quetion');
const { getUserById } = require('../controller/user');
const router = express.Router();
router.param('userId',getUserById);
router.param('qId',getQuetionById);
router.post('/quetion/add/:userId',isLoggedIn,isAuthenticated,isAdmin,addQuetion);
router.put('/quetion/:qId/:userId',isLoggedIn,isAuthenticated,updateCompletedBy);
router.get('/quetions',getAllQuetions);

module.exports = router;