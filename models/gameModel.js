const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        required: true,
    },

    studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        required: true,
    },

    release: {
        type: Number,
        required: true,
    },    
    
    cover: {
        type: String,
        required: true,
    },
    
    video: {
        type: String,
        required:true,
        trim: true,
    },
    
    rating: {
        type: Number,    //Jei bus range input elementas reikes paversti is stringo i number kad praeitu sia validacija. Stepas nusistato fronte.
        min: 1,
        max: 5,
    },

    genres: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Genre',
        required: true,
    },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
}, { timestamps: true })

const Game = mongoose.model('Game', gameSchema)

module.exports = Game