const Difficulty = require("../models/Difficulty");

exports.createDifficulty = async (req,res) =>{
    try{
        const {type} = req.body;
      
        if(!type){
            res.status(400).json({
                error:"Difficulty type is required"
            })
        }
        const difficulty = await Difficulty.create({
            type
        });
        res.json(difficulty);
        
    }catch(err){
        res.json({
            error:"Something went wrong"
        })
    }
};

exports.getDifficulties = async(req,res) =>{
    try{
        const difficulties = await Difficulty.find();
        res.json(difficulties);
    }catch(err){
        res.json({
            error : "Something went wrong"
        })
    }
}

exports.deleteDifficulty = async () =>{
    try{
        
    }catch(err){
        res.status(400).json({
            error:err
        })
    }
}