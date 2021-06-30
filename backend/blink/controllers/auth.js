const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.authLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loginUser;

    User.findOne({
        email: email,
    })
    .then(user => {
        if(!user) {
            const error = new Error("No user with such email!");
            error.statusCode = 422;
            throw error;
        }
    
        loginUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isValid => {
        if(!isValid) {
            const error = new Error("Incorrect Password!");
            error.statusCode = 422;
            throw error;
        }

        const token = jwt.sign({
            userId: loginUser._id, 
        }, 'secret', {
            expiresIn: '24h',
        });

        res.status(200).json({
            message: "User Logged in", 
            token: token,
            userId: loginUser._id.toString(),
        });
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.authSignup = (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    let signupUser;

    User.findOne({userName: userName})
    .then(user => {
        if(user) {
            const error = new Error("This email is occupied!");
            error.statusCode = 422;
            throw error;
        }
        return bcrypt.hash(password, 12);
    })
    .then(passwordHash => {
        const user = new User({
            userName: userName,
            email: email,
            password: passwordHash,
        });
        
        return user.save();
    })
    .then(result => {
        const token = jwt.sign({
            userId: result._id, 
        }, 'secret', {
            expiresIn: '24h',
        });

        res.status(200).json({
            message: "User Signed up", 
            token: token,
            userId: result._id.toString(),
        })
    })
    .catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}