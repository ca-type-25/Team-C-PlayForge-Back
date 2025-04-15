const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    article: {
        type: String,
        required: true,
    },

    iframe: {
        type: String,
        trim: true,
    },




    // ar reikia kad user galetu sukurti article/naujiena home page? ir jei taip prideti roles validacija, kad galetu tik admin/moderator.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // -----------------------------------------------------------------




}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

module.exports = Article