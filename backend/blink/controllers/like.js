const Like = require('../models/like');
const Post = require('../models/post');
const User = require('../models/user');


exports.getLikes = (req, res, next) => {
    const postId = req.params.postId;

    Like.find({post: postId})
    .countDocuments()
    .then(count => {
       res.status(200).json({
           message: "Likes Received",
           likes: count,
       })
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.getUserLikes = (req, res, next) => {
    const userId = req.params.userId;

    Post.find({creator: userId})
    .then(result => {
        return Like.find({ post: { $in: result } }).countDocuments();
    })
    .then(count => {
        res.status(200).json({
            message: "User Likes Received",
            userLikes: count,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.getIsLiked = (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;

    Like.findOne({post: postId, liker: userId})
    .then(result => {
        if(!result) {
            return res.status(200).json({
                message: "Is Liked Received",
                isLiked: false,
            });
        }

        res.status(200).json({
            message: "Is Liked Received",
            isLiked: true,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.postLike = (req, res, next) => {
    const userId = req.userId;
    const postId = req.body.postId;

    const like = new Like({
        post: postId,
        liker: userId,
    });

    like.save()
    .then(result => {
        res.status(200).json({
            message: "Liked Post",
            post: postId,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.postUnLiked = (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;

    Like.findOneAndDelete({
        liker: userId,
        post: postId,
    })
    .then(result => {
        res.status(200).json({
            message: "Unliked Post",
            post: postId,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error); 
    });
}


