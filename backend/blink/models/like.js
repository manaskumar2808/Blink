const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: false,
    },
    liker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});


module.exports = mongoose.model('Like', likeSchema);