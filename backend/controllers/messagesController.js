const messageModel = require('../model/messageModel');

const addMessages = async (req, res)=>{
    try {
        const {from, to, message} = req.body;
        const data = await messageModel.create({
            message: message,
            users: [from, to],
            sender: from
        });
        if(data){
            res.status(200).json({msg: "Message Added Successfully."})
        }
        return res.status(400).json("Failed to add message to the database")
    } catch (error) {
        
    }
}

const getAllMessages = async (req, res)=>{
    try {
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1}); 
        
        const projectMessage = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message
            }
        })
        res.json(projectMessage)
    } catch (error) {
        
    }
}

module.exports = {addMessages, getAllMessages}