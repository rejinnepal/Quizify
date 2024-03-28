var express = require("express");

const router = express.Router();
var userController = require('./userController');

router.route('/user/getAll').get(userController.getDataControllerfn);

router.route('/user/create').post(userController.createUserControllerFn);

module.exports = router;