const express = require('express');
const { isLoggedIn, isAuthenticated } = require('../controller/auth');
const { getQuetionById } = require('../controller/quetion');
const { getUserById, getUser, getUsersAllQuetions, getQuetionsSolvedCount, updateCompletedQuetions, deleteCompletedQuetions, increasePoints, decreasePoints,getPoints } = require('../controller/user');
const router = express.Router();

router.param('userId',getUserById);
router.param('qId',getQuetionById);
router.get('/user/:userId',isLoggedIn,isAuthenticated,getUser);
router.get('/quetions/user/:userId',isLoggedIn,isAuthenticated,getUsersAllQuetions);
router.get('user/:userId/quetionsCount',isLoggedIn,isAuthenticated,getQuetionsSolvedCount);
router.put('/quetions/user/:userId/:qId',isLoggedIn,isAuthenticated,updateCompletedQuetions);
router.delete('/quetions/user/:userId/:qId',isLoggedIn,isAuthenticated,deleteCompletedQuetions);
router.post('/user/:userId/:qId/inc',isLoggedIn,isAuthenticated,increasePoints);
router.post('/user/:userId/:qId/dec',isLoggedIn,isAuthenticated,decreasePoints);
router.get('/user/:userId/points',isLoggedIn,isAuthenticated,getPoints);



module.exports = router;
