const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{ expiresIn: '30d'})
};

//Register User
const registerUser = async(req,res)=>{
    const {name, email, password} = req.body;
    const userExits = await User.findOne({email});
    if(userExits){
        res.status(400).json({message:'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({name, email,password: hashedPassword});
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    }else{
        res.status(400).json({message: 'Invalid user data'});
    }
};

//Auth User /Login
const authUser = async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    }else{
        res.status(401).json({message: 'Invalid credentials'});
    }
};

module.exports = {registerUser,authUser};