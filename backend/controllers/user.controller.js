const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../middleware/authentication');

const registerUser = async(req,res) =>{
    const {name,email,password,role,profileImage,address} = req.body;
    if(name == "" || !email || !password || !role || !profileImage || !address){
        return res.status(400).json({message:"Insufficient user credentials"});
    }
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:email,msg:user});
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role,
            profileImage:profileImage,
            address:address
        });
        return res.status(200).json(newUser);
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

const signinUser = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Insufficient user credentials"});
    }
    try{
        const isExist = await User.findOne({email});
        if(!isExist){
            return res.status(400).json({message:"User not exist in the DB"});
        }
        if(isExist && await bcrypt.compare(password,isExist.password)){
            return res.status(200).json({isExist,token:generateToken(isExist._id)})
        }
        return res.status(400).json({message:"Unable to generate token"});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

const displayAllUsers = async(req,res) =>{
    const response = await User.find();
    try{
        if(!response && response.length == 0){
            return res.status(400).json({message:"No data found"});
        }
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {registerUser,signinUser,displayAllUsers};