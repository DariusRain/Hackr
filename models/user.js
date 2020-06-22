const mongoose = require("mongoose"),
  UserSchema = mongoose.Schema({
    avatar: {
      type: String,
      required: true,
    },

    user: {
      type: String,
      required: true,
      unique: true,
    },
    online: {
      type: Boolean,
      default: false,
    },
    gitid: {
      type: Number,
      unique: true,
    },
    registerDate: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("User", UserSchema);
