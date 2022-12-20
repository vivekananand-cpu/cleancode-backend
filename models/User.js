const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const Question = new mongoose.Schema({
    title : {
        type : String,
    },
    difficulty : {
        type : ObjectId ,
        ref : "difficulty"
    },
    completedStatus : {
        type : Boolean,
        default : false
    },
    url : String

},{timestamps : true})

const UserSchema = new mongoose.Schema({
    name : String,
    role : {
        type : Number,
        default : 0
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    completedQuetions : [Question],
    points : { 
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('user',UserSchema);