const { Schema, model } = require('mongoose')

const post = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Post', post)