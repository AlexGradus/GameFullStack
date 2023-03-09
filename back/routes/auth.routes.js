const Router = require("express");
const Game = require("../models/Game");
const config = require("config");
const router = new Router();
const mongoose = require("mongoose");



router.post('/pushstep',async (req, res) =>{
    try {
        const {id, steps,currentStep } = req.body;
       
       
       const gameExists = await Game.findOne({id});
       if(gameExists){
         await Game.updateMany({id:id},{$set:{steps:steps,currentStep:currentStep}});
        return res.json({message:'Game is updated'});
       }
        
        
       
       
        const game= new Game({ id,steps:steps,currentStep:currentStep});
        await game.save();
        return res.json({message:'game is created'});

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})

router.post('/getsteps',async (req, res) =>{
    try {
        const {id } = req.body;
       
       
       const result = await Game.findOne({id});
       return res.json({
        result
    })
     } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})





module.exports = router;