const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    
    picture: {
        type: String,
        trim: true,
    },

    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment