const express = require('express');

const Router = express.Router();

const authControllers = require('../controllers/auth');
const authValidator = require('../validators/auth');

Router.post('/login', authValidator, authControllers.authLogin);
Router.post('/signup', authValidator, authControllers.authSignup);

module.exports = Router;