const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    const userId = req.userId;

    User.find()
    .then(users => {
        res.status(200).json({
            message: "Users Retrieved!",
            users: users,
        });
    })  
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.getUser = (req, res, next) => {
    const userId = req.userId;
    const id = req.params.id;

    User.findById(id)
    .then(user => {
        res.status(200).json({
            message: "User Retrieved!",
            user: user,
        });
    })  
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.updateUser = (req, res, next) => {
    const userId = req.userId;
    const userName = req.body.userName;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const themeIndex = req.body.themeIndex;
    let profileImageUrl;

    if(req.files && req.files.length !== 0) {
        profileImageUrl = req.files[0].path;
    }

    User.findByIdAndUpdate(userId)
    .then(user => {
        user.userName = userName;
        if(profileImageUrl) {
            user.profileImageUrl = profileImageUrl;
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.themeIndex = themeIndex;

        return user.save();
    })
    .then(result => {
        res.status(200).json({
            message: "User Updated!",
            user: result,
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.userId;

    User.findByIdAndDelete(userId)
    .then(result => {
        res.status(200).json({
            message: "User Deleted!",
        });
    })  
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}