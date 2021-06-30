const express = require('express');

const Router = express.Router();

const userControllers = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');

Router.get('/', isAuth, userControllers.getUsers);
Router.get('/:id', isAuth, userControllers.getUser);
Router.patch('/:id', isAuth,  userControllers.updateUser);
Router.delete('/:id', isAuth, userControllers.deleteUser);

module.exports = Router;