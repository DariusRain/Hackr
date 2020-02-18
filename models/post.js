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
        }

    }
)

module.exports = mongoose.model('Post', PostSchema);

