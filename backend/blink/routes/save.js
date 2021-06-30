const express = require('express');

const Router = express.Router();

const saveControllers = require('../controllers/save');
const isAuth = require('../middlewares/isAuth');


Router.get('/saves', isAuth, saveControllers.getSaves);
Router.get('/:postId/is-saved', isAuth, saveControllers.getIsSaved);
Router.post('/', isAuth, saveControllers.postSave);
Router.delete('/:postId/unsave', isAuth, saveControllers.postUnsaved);

module.exports = Router;