const express = require ('express');
const router = new express.Router();
const routes = router;

import UserController from './controllers/UserController'
const userController = new UserController();



routes.get('/login', userController.create);

export default routes;
