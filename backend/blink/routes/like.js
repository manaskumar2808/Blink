const express = require('express');

const Router = express.Router();

const likeControllers = require('../controllers/like');
const isAuth = require('../middlewares/isAuth');


Router.get('/:postId/likes', isAuth, likeControllers.getLikes);
Router.get('/user/:userId/likes', isAuth, likeControllers.getUserLikes);
Router.get('/:postId/is-liked', isAuth, likeControllers.getIsLiked);
Router.post('/', isAuth, likeControllers.postLike);
Router.delete('/:postId/unlike', isAuth, likeControllers.postUnLiked);

module.exports = Router;