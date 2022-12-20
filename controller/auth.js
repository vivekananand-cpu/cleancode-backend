const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req,res) =>{
    const {email,password,name} = req.body;
    try{
        if(!(email && password && name)){
            return res.status(40).json({error:"Please fill add data"})
        }
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({error:"User already exists"});
        }
        const hashPass = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password : hashPass,
        })
        res.status(201).json({
            id : user._id,
            name : user.name,
            email : user.email
        });

    }catch(err){
        res.status(500).json({error:"Please fill all the data"});
    }
}


exports.signin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!(email && password)){
        res.status(400).json({error:"fill all fields"});
        }
        const existingUser = await User.findOne({email});
        if(!existingUser){
            res.status(400).json({
                error:"user does not exists"
            })
        }
        const passwordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!passwordCorrect){
            res.status(400).json({

                error:"Wrong Credentials"
            })
        }
        //setting token
        const token = jwt.sign({_id:existingUser._id},JWT_SECRET);
        //put token in cookie
        res.cookie('token',token,{expire:new Date()+9999});
        //send res to frontend
        const {_id,name,email:userEmail,role,completedQuetions} = existingUser;
        
        res.json({
            token,
            user:{
                _id,
                name,
                userEmail,
                role
            }
        })

    }catch(err){
        res.status(400).json({error:"Wrong credentials"});
    }
}

exports.signout = (req,res) =>{
    res.clearCookie('token');
    res.json({
        message:"User signed out"
    })
}
//protected routes
exports.isLoggedIn = expressjwt({
    secret : JWT_SECRET,
    algorithms: ["HS256"],
    userProperty : "auth"
    //stores in user request
});

exports.isAuthenticated = (req,res,next) =>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"access denied"
        })
    }
    next();
}

exports.isAdmin = (req,res,next) =>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"You are not an admin"
        })
    }
    next();
}