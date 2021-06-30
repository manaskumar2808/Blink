const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const likeRoutes = require('./routes/like');
const saveRoutes = require('./routes/save');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'image') {
            cb(null, 'images');
        } else if(file.fieldname === 'profileImage') {
            cb(null, 'profile-images');
        }
    }, 
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({
    storage: storage,
    fileFilter: fileFilter,
}).any());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/profile-images', express.static(path.join(__dirname, 'profile-images')));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/like', likeRoutes);
app.use('/save', saveRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        errorMessage: error,
    });
});


mongoose.connect('mongodb+srv://manas28:subham2808@cluster0.fnmec.mongodb.net/blink', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(result => {
    app.listen(2000);
})
.catch(error => {
    console.log(error);
});
