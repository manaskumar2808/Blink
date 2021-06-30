const Save = require('../models/save');

exports.getSaves = (req, res, next) => {
    const userId = req.userId;

    Save.find({saver: userId})
    .populate('post')
    .then(result => {
       res.status(200).json({
           message: "Saves Received",
           saves: result,
       });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.getIsSaved = (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;
    
    Save.findOne({post: postId, saver: userId})
    .then(result => {
        if(!result) {
            return res.status(200).json({
                message: "Is Saved Received",
                isSaved: false,
            });
        }

        res.status(200).json({
            message: "Is Saved Received",
            isSaved: true,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}


exports.postSave = (req, res, next) => {
    const userId = req.userId;
    const postId = req.body.postId;

    const save = new Save({
        post: postId,
        saver: userId,
    });

    save.save()
    .then(result => {
        res.status(200).json({
            message: "Saved Post",
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


exports.postUnsaved = (req, res, next) => {
    const userId = req.userId;
    const postId = req.params.postId;

    Save.findOneAndDelete({
        saver: userId,
        post: postId,
    })
    .then(result => {
        res.status(200).json({
            message: "Unsaved Post",
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


