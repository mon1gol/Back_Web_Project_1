const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    name: String,
    password:{
        type: String,
        required: true
    },
    userPost:{
        post: [
            {
                postId:{
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                    required: true
                }
            }
        ]
    }
})

module.exports = model('User', userSchema)