const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saveSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: false,
    },
    saver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});


module.exports = mongoose.model('Save', saveSchema);