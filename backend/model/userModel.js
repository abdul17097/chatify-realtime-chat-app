const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAvatar: {type: Boolean, default: false},
    avatarImage: {type: String, default: ""}
},
{
    timestamps: true
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;