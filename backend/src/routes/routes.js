const express = require('express');
const routes = new express.Router();
const UserController = require('../controllers/UserController');

routes.post('/user/registrar', UserController.register);
routes.post('/user/login', UserController.login);
routes.get('/user', UserController.getUser);
routes.patch('/user', UserController.updateUser);

module.exports = routes;