const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const User = new mongoose.Schema({
    user : {
        type : ObjectId,
        ref : 'user'
    }
})

const QuestionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    difficulty : {
        type : ObjectId,
        ref : "difficulty",
        required : true
    },
    url:{
        type : String,
        required : true
    },
    completionStatus : {
        type : Boolean,
        default : false
    },
    completedBy : [User],
    platform : String
    
});

module.exports = mongoose.model('quetion',QuestionSchema);