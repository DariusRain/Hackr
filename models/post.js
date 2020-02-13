const mongoose = require('mongoose'),
PostSchema = mongoose.Schema(
    {
        avatar: {
            type: String,
            required: true
        },
        username: {
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
    }
)

module.exports = mongoose.model('Post', PostSchema);