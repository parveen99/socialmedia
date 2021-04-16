const { json } = require('body-parser');
const express = require('express');
const Signupdetails = require('../Model/Signupdetails');
const router = express.Router(); 

//LOGIN USING USERNAME / PASSWORD
router.get('/' ,async (req,res) => {
    try{
        if(req.body.email){
        var login = await Signupdetails.findOne({email : req.body.email});
        !login && res.status(400).json({message : "User not found! Invalid emailID"});
        }

        else{
        var login = await Signupdetails.findOne({userName : req.body.userName});
        !login && res.status(400).json({message : "User not found! Invalid user"});
        }

        if(req.body.userName === login.userName || req.body.email === login.email){
            if(req.body.password ===login.password){
                res.json({message : "Login Successfull"});
            }
            else{
                res.json({message : "Invalid Password"});
            }
        }
    }
    catch (err) {
        res.status(500).json({message : err});
    }
});

//UPDATING PASSWORD
router.patch('/:username' ,async (req,res) => {
    if(req.body.userName === req.params.username){
        try{
            await Signupdetails.updateOne(
                {userName : req.body.userName} ,
                {$set:{password : req.body.password}}
            );
            res.json({message : "Password updated successfully"});
        }
        catch (err){
            res.status(500).json({message : err});
        }
    }
    else{
        return res.json({message:"You can update only your password"});
    }
});

//DELETING A USER
router.delete('/:username' , async (req, res) => {
    if(req.body.userName === req.params.username){
        try{
            await Signupdetails.remove({userName : req.params.username });
            res.json({message : "User removed successfully"});
        }
        catch (err){
            res.status(500).json({message : err});
        }
    }
    else{
        return res.json({message : "You can only delete your account"});
    }
});


//UPDATING ANY INFORMATION

router.patch("/updateany/:username" , async (req,res) => {
    if(req.body.userName === req.params.username){
        try{
            await Signupdetails.findOneAndUpdate(
                {userName:req.body.userName},
                {$set:req.body});
            res.status(200).json({message : "User Details Updated Successfully"});
        }
        catch (err) {
            res.status(500).json({message : err});
        }
    }
    else{
        return res.json({message : "You can update only your account"});
    }
});

module.exports = router ;
