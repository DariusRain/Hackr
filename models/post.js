const mongoose = require('mongoose'),
PostSchema = mongoose.Schema(
    {
        username: {
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