const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    users: Array,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
},
{
    timestamps: true
})

const messageModel = mongoose.model("messages", messageSchema);

module.exports = messageModel;