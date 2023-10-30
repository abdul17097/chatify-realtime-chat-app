const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: {type: String, trim: true},
    isGroupAdmin: {type: Boolean, default: false},
    users: [
        {type: mongoose.Schema.Types.ObjectId, ref: "users"},        
    ],
    latestMessage: {type:mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    
},{
    timestamps: true
})

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel
