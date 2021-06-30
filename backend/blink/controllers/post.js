const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    const page = req.query.page;
    const perPage = 8;
    let totalItems;
    Post.find()
    .countDocuments()
    .then(count => {
        totalItems = count;
        return Post.find()
        .populate('creator')
        .sort({
            createdAt: -1,
        })
        .skip((page - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
        res.status(200).json({
            message: "Posts Retrieved!",
            posts: posts,
            totalPosts: totalItems,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.getSearchPosts = (req, res, next) => {
    const searchText = req.query.title;

    Post.find({
        title: searchText,
    })
    .collation({
        locale: 'en',
        strength: 2,
    })
    .sort({
        createdAt: -1,
    })
    .populate('creator')
    .then(posts => {
        res.status(200).json({
            message: "Searched Posts Retrieved!",
            searchedPosts: posts,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.getUserPosts = (req, res, next) => {
    const userId = req.userId;
    const creatorId = req.params.creatorId;

    Post.find({
        creator: creatorId,
    })
    .sort({
        createdAt: -1,
    })
    .populate('creator')
    .then(posts => {
        res.status(200).json({
            message: "User Posts Retrieved!",
            posts: posts,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .populate('creator')
    .then(post => {
        res.status(200).json({
            message: "Post Retrieved!",
            post: post,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);  
    });
}

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const userId = req.userId;
    let imageUrl;

    if(req.files) {
        imageUrl = req.files[0].path;
    }

    const post = new Post({
        title: title,
        imageUrl: imageUrl,
        creator: userId,
    });

    post.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post Created!",
            post: result,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.updatePost = (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const title = req.body.title;
    let imageUrl;

    if(req.files) {
        imageUrl = req.files[0].path;
    }

    Post.findByIdAndUpdate(postId)
    .then(post => {
        post.title = title;
        post.imageUrl = imageUrl;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: "Post Updated",
            post: result,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findByIdAndDelete(postId)
    .then(result => {
        res.status(200).json({
            message: "Post Deleted",
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}