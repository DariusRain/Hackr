const mongoose = require('mongoose'),
PostSchema = mongoose.Schema(
    {
        avatar: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        post: {
            type: String,
            tags: ['posts'],
            required: true,
            minlength: 3,
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
    }
)

module.exports = mongoose.model('Post', PostSchema);

