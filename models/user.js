const mongoose = require('mongoose'),
UserSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required:true,
            unique: true
        },
        data: {
            type: Object,
            default: {}
        },
        online: {
            type: Boolean,
            default: false
        },
        git_id: {
            type: Number,
            required: true,
            unique: true
        },
        registerDate: {
            type: Date,
            date: Date.now
        }

    }
)

module.exports = mongoose.model('User', UserSchema);