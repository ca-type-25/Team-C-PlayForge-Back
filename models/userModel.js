const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid name`
        },
    },

    surname: {
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid surname`
        },
    },

    nickname: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid nickname`
        },
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: value => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: ({ value }) => {
                return `${value} is not a valid email.`
            }
        },
    },

    age: {
        type: Number,
        min: 0,
    },

    bio: {
        type: String,
    },

    avatar: {
        type: String,
        trim: true,
    },

    role: {
        type: String,
        required: true,
        default: 'user',
    },

    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    },

    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User