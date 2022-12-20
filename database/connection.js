const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB;

const connect = async() =>{
    try{
        await mongoose.connect(DB);
        console.log("connected to database");
    }catch(err){
        console.log(err);
    }
}

module.exports = connect;