const mongoose = require('mongoose'),
PostSchema = mongoose.Schema(
    {
        avatar: {
            type: String,
            required: true
        },
<<<<<<< HEAD
        username: {
=======
        user: {
>>>>>>> Oauthv1.0.1
            type: String,
            required: true
        },
        uid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post: {
            type: String,
            tags: ['posts'],
            required: true,
            minlength: 3,
<<<<<<< HEAD
            maxLength: 255
        },
        upvotes: {
            type: Number,
            tags: ['up_votes', 'voters'],
            default: 0
        },
        downvotes: {
            type: Number,
            tags: ['down_votes', 'voters'],
            default: 0
        },
        upvoters: {
            type: Array,
            tags:['upvoters', 'voters'],
            default: []
        },
        downvoters: {
            type: Array,
            tags:['downvoters', 'voters']
        } 
=======
            maxLength: 300
        },
        thumbups: {
            type: Array,
            tags: ['thumbups'] 
        },
        thumbdowns: {
            type: Array,
            tags: ['thumbdowns']
        }
>>>>>>> Oauthv1.0.1
    }
)

module.exports = mongoose.model('Post', PostSchema);

