const  {Schema, model} = require("mongoose");

const Game = new Schema({
   id: {type: String},
   steps: {type: Array},
   currentStep:{type: String},
   
},{timestamps:true})



module.exports = model('Game', Game);