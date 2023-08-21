const express = require('express')
const userController = require('../controller/usersController');
const authController = require('../controller/authController');
const router = express.Router()

// router.route('/').post(userController.createUser);
router.route('/:id').put(userController.updateUser).get(userController.getUser);

router.route('/login').post(authController.signin);
router.route('/signup').post(authController.signup);
router.route('/logout').post(authController.logout);
module.exports = router