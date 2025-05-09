const mongoose = require('mongoose')

const studioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        required: true,
    },

    year: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const Studio = mongoose.model('Studio', studioSchema)

module.exports = Studio