const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    developer: {
        type: String,
        required: true,
    },

    releaseYear: {
        type: Number,
        required: true,
    },    
    
    cover: {
        type: String,
        required: true,
    },
    
    iframe: {
        type: String,
        required:true,
        trim: true,
    },
    
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },

    genres: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Genre',
        required: true,
    },


    // del shopo, ar pridedam krepseli?


}, { timestamps: true })

const Game = mongoose.model('Game', gameSchema)

module.exports = Game