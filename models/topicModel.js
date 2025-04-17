const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    },
}, { timestamps: true })

const Topic = mongoose.model('Topic', topicSchema)

module.exports = Topic