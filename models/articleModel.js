const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    video: {
        type: String,
        trim: true,
    },

    image: {
        type: String,
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    subjects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Subject',
    },
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article