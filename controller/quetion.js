const Question = require("../models/Question");
const User = require("../models/User");

exports.addQuetion = async (req,res) =>{
    try{
        const {title,difficulty,url} = req.body;
        if(!(title && difficulty)){
            res.status(400).json({
                error:"please fill all the fields"
            })
        }
        const quetion = await Question.create({
            title,
            difficulty,
            url
        });
        res.status(201).json(quetion);

    }catch(err){
        res.status(400).json({
            error:err
        })
    }
};

exports.getQuetionById = async(req,res,next,qId) =>{
    try{
        const quetion = await Question.findById(qId).populate('difficulty');
        if(!quetion){
            res.status(400).json({
                error:"Quetion not Found"
            })
        }
        req.quetion = quetion;
        next();
    }catch(err){
        res.json({
            error:"Quetion not found"
        });
    }
}

exports.updateCompletedBy = async(req,res) =>{
    try{
        const updatedQuetion = await Question.findByIdAndUpdate({
            _id:req.quetion._id
        },{
            $push : {
                completedBy : req.profile
            },
           
        },
        {
            new : true , useFindAndModify : false
        }
        )
        res.json(updatedQuetion);
    }catch(err){
        res.status(400).json({
            error:err
        })
    }
};
exports.getAllQuetions = async (req,res) =>{
    try{
        const quetions = await Question.find().populate('difficulty');
        res.json(quetions);
    }catch(err){
        res.status(400).json({
            error:"Quetions not found"
        })
    }
}