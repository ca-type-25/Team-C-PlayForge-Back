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
    
    subject: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        type: {
            type: String,
            enum: ['Game', 'Studio', 'Genre'],
        }
    },
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article