const { json } = require('body-parser');
const express = require('express');
const Postdetails = require('../Model/Postdetails');
const router = express.Router();


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














module.exports = router ;
