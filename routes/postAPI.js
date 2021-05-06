let express = require('express');
let router = express.Router();
let userDetails = require('../Model/userDetails');
let postDetails = require('../Model/postDetails');
let auth = require('../routes/auth');

//CREATE A POST
router.post('/' ,auth ,async (req,res) => {
    try{
            let userCount = await postDetails.countDocuments({userId : req.body.userId });
            let userName = await userDetails.findOne({_id : req.body.userId},{userName : 1});
            userName = userName.userName + (userCount+1);
            let newPost = new postDetails({
                _id : userName ,
                userId : req.body.userId ,
                status : req.body.status ,
                likes : []
            });
            await newPost.save();
            res.status(201).json({message : "Status posted successfully"});
    } catch (err){
        res.status(500).json({error : err.errors.status.message});
    }
});

//LIKE A POST
router.post('/like' ,auth,async (req,res) => {
    try{
        const existingPost = await postDetails.findOne({_id: req.body.postId});
        if(existingPost){
            if(!existingPost.likes.includes(req.body.likes)){
                await existingPost.updateOne({$push :{likes : req.body.likes}});
                res.status(200).json({message:"You have liked this Status"});
            }
            else{
                res.status(400).json({message:"You have already liked this Status"});
            }
        }
        else{
            res.status(400).json({error:"No such post to Like"});
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//Get Status Information
router.get('/statusInformation' ,auth ,async (req,res) => {
    if(!req.body.postId){
        res.status(400).json({message : "Please enter status ID"});
    }
    else{
        try{
            let post = await postDetails.findOne({_id : req.body.postId});
            statusInformation = {
                number_of_likes : post.likes.length ,
                status_creation : post.createdAt ,
                status_author : post.userId ,
                likes : post.likes
            }
            res.status(200).json(statusInformation);
        }catch (err) {
            res.status(500).json({error : err});
        }
    }
});



module.exports = router;
