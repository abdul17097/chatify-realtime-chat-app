const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');
const login = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const verifyPassword = await bcrypt.compare(password, user.password);
            if(verifyPassword){
                const token = await jwt.sign({id: user._id}, process.env.USER_SECRET_KEY, 
                    {
                        expiresIn: "10d"
                    })
                res.status(200).json({success: true, user: {id: user._id,name: user.name, email: user.email, token: token}});
            }else{
                res.status(409).json({success: false, message: "Invalid Credentials"})
            }
        }else{
            res.status(409).json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        res.status(400).json({message: 'Something went Wrong'})
    }

}

const register = async (req,res)=>{
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const check = await User.findOne({email: email});
        
        if(!check){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const createUser = await User.create({name,email, password :hashPassword})
            res.status(201).json({success: true,user:createUser});
        }else{
            res.status(409).json({success: false, message: 'user already found!'})
        }
    } catch (error) {
        res.status(400).json({message: 'Something went Wrong'})
        
    }
}

const allUser = async (req,res)=>{
    try {
        const id =  req.params.id;
        const allUser = await User.find({_id: {$ne: id}}).select([
            "name",
            "email",
            "avatarImage",
            "_id"
        ])
        if(allUser){
            res.status(200).json(allUser)
        }else{
            res.status(400)
        }
    } catch (error) {
        
    }
}

    const setAvatar = async (req,res)=>{
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            const userData = await User.findByIdAndUpdate(
                userId,
                {
                  isAvatar: true,
                  avatarImage
                }
              );
            res.status(200).json({isSet: userData.isAvatar, image: userData.avatarImage })
        } catch (error) {
            
        }

}

module.exports = {login, register, allUser, setAvatar}