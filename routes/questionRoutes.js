const express = require('express')
const router = express.Router()
const controller = require('../controller/questionanswerController.js')
const authController = require('../controller/authController.js')
router.route('/').get(authController.protect,controller.getAllQuestions).post(authController.protect,controller.postQuestion);
router.route('/:id').get(controller.getQuestion).put(authController.protect,controller.updateQuestion).delete(authController.protect,controller.deleteQuestion).post(authController.protect,controller.writeanswer);
router.route('/search/:key').get(controller.search);
module.exports = router