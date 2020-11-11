const express = require ('express');
const router = new express.Router();
const routes = router;

import UserController from './controllers/UserController'
const userController = new UserController();



routes.post('/user', userController.create);
routes.get('/user', userController.index);
routes.put('/user/:id', userController.update);
routes.delete('/user/:id', userController.delete);





export default routes;
