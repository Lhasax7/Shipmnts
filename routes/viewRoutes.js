const express = require('express');
const router = express.Router();
const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
router.get('/', viewController.getOverview);
router.get('/login',viewController.getLogin);
router.get('/askquestion',viewController.getaskquestion);
router.get('/me',viewController.getProfile)
router.get('/updateMe',viewController.getUpdateMe)
router.get('/search',viewController.getSearchResults)
router.get('/question/:id',viewController.viewQuestion)
router.get('/userprofile/:id',viewController.getUserProfile)
module.exports = router;