
const mongoose = require('mongoose'),
PostSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
        },

        postDate: {
            type: Date,
            default: Date.now
        },
        
        post: {
            type: String,
            tags: ['posts'],
            required: true,
            minlength: 3,
            maxLength: 3000
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

module.exports = mongoose.model('Post', PostSchema)