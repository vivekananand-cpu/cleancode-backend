const mongoose = require('mongoose');

const DifficultySchema = new mongoose.Schema({
    type : String
})

module.exports = mongoose.model('difficulty',DifficultySchema);