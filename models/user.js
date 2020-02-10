const mongoose = require('mongoose'),
UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 2,
            maxlength: 255,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        online: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: {}
        },
        registerDate: {
            type: Date,
            date: Date.now
        }

    }
)

module.exports = mongoose.model('User', UserSchema);