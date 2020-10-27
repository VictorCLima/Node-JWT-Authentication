const express = require ('express');
const router = new express.Router();
const routes = router;



import CreateUserController from './controllers/CreateUserController'
const createUserController = new CreateUserController();



routes.get('/login', createUserController.create);

export default routes;
