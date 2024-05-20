const express = require('express');
const useRouter = express.Router();
const proFileMiddleWare = require('../app/middlewares/CheckUser')
const userController = require('../app/controllers/UserController');
const middleCourse = require('../app/middlewares/MiddeleCourse');


useRouter.get('/:slug/:_id', middleCourse.verifyCourse, userController.show);
useRouter.get('/', userController.index);

module.exports = useRouter;
