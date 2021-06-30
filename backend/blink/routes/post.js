const express = require('express');

const postValidator = require('../validators/post');

const Router = express.Router();

const postControllers = require('../controllers/post');
const isAuth = require('../middlewares/isAuth');

Router.get('/', isAuth, postControllers.getPosts);
Router.get('/search', postControllers.getSearchPosts);
Router.get('/:creatorId/posts', postControllers.getUserPosts);
Router.get('/:postId', isAuth, postControllers.getPost);
Router.post('/create', isAuth, postValidator, postControllers.createPost);
Router.patch('/:postId', isAuth, postValidator, postControllers.updatePost);
Router.delete('/:postId', isAuth, postControllers.deletePost);

module.exports = Router;