const { json } = require('body-parser');
const express = require('express');
const Postdetails = require('../Model/Postdetails');
const router = express.Router();


//CREATE A POST
router.post('/', async(req,res) => {
    try{
        var newPost = await Postdetails(req.body);
        var savedPost = await newPost.save();
        res.status(201).json(savedPost);
        //res.status(201).json({message : "Status posted successfully"});
    }catch (err){
        res.status(500).json({message : err});
    }
});

//LIKE A POST
router.put('/:username/like', async(req,res) => {
    try{
        const Post = await Postdetails.findOne(req.params.username);
        if(!post.likes.includes(req.body.userName)){
            await Post.updateOne({$push :{likes : req.body.userName}});
            res.status(200).json("You have liked this Status");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});














module.exports = router ;
