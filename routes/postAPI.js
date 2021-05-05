let express = require('express');
let router = express.Router();
let postDetails = require('../Model/postDetails');
let statusDetails = require('../Model/statusDetails');

//CREATE A POST
router.post('/' ,async (req,res) => {
    try{
        var newPost = await postDetails(req.body);
        if(req.body.status){
            await newPost.save();
            res.status(201).json({message : "Status posted successfully"});
        }
        else{
            res.status(400).json({message:"Status is required"});
        }
    } catch (err){
        res.status(500).json({message : err});
    }
});

//LIKE A POST
router.post('/like' ,async (req,res) => {
    try{
        const existingStatus = await statusDetails.findOne({userName : req.body.userName , status : req.body.status});
        if(existingStatus){
            if(!existingStatus.likes.includes(req.body.likes)){
                await existingStatus.updateOne({$push :{likes : req.body.likes}});
                res.status(200).json({message:"You have liked this Status"});
            }
            else{
                res.status(400).json({message:"You have already liked this Status"});
            }
        }
        else{
            var newStatuslike = await statusDetails(req.body);
            await newStatuslike.save();
            res.status(201).json({message:"You are the first like for this status"});
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
