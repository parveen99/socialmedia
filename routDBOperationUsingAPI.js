let express = require('express');
let router = express.Router();
let postDetails = require('../Model/postDetails');
let userDetails = require('../Model/userDetails');
let statusDetails = require('../Model/statusDetails');

//user INFORMATION
router.get('/user' ,async (req,res) => {
    if(!req.body.userName){
        res.json({message : "Please enter username"});
    }
    else{
        try{
            let post = await postDetails.find({userName : req.body.userName});
            let user = await userDetails.findOne({userName : req.body.userName});
            let status = await statusDetails.find();

            //status posted by the user
            userstatus = [];
            for (let i=0; i<post.length ; i++){
                userstatus.push(post[i].status);
            }

            //status liked by the user
            statusLiked = []
            for (let i=0; i < status.length; i++) {
              for (let j=0 ; j < status[i].likes.length ; j++){
                  if(status[i].likes[j] === req.body.userName){
                      statusLiked.push(status[i].status);
                  }
              }
            }

            userInformation = {
                accountCreation : user.createdAt,
                uniqueusername : user.userName,
                personalInformation: {
                    firstName : user.personalInformation.firstName ,
                    lastName : user.personalInformation.lastName ,
                    phoneNumber : user.personalInformation.phoneNumber ,
                    DOB : user.personalInformation.DOB
                } ,
                address : {
                    street : user.address.street ,
                    city : user.address.city ,
                    pincode : user.address.pincode ,
                    state : user.address.state ,
                    country : user.address.country
                } ,
                statusPosted : userstatus,
                statusLiked : statusLiked
            }

            res.status(200).json(userInformation);
        } catch (err) {
            res.status(500).json({message : err});
        }
    }
});

//status INFORMATION
router.get('/status' ,async (req,res) => {
    if(!req.body.status){
        res.status(400).json({message : "Please enter status"});
    }
    else{
        try{
            let Post = await postDetails.findOne({status : req.body.status});
            let status = await statusDetails.findOne({status : req.body.status});
            statusInformation = {
                number_of_likes : status.likes.length ,
                status_creation : Post.created_at ,
                status_author : status.userName ,
                likes : status.likes
            }
            res.status(200).json(statusInformation);
        }catch (err) {
            res.json({message : err});
        }
    }
});

//SEARCH A user 
router.get('/searchuser' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "Please enter username"});
    }
    else{
        try{
            //case-insensitive search
            let user = await userDetails.find({userName: {$regex: req.body.userName , $options : "i"}}); 
            usernameArray = [];
            for (let i=0; i<user.length ;i++){
                usernameArray.push(user[i].userName)
            }
            res.json(usernameArray);
        } catch (err) {
            res.json({message : err});
        }
    }
});

//userS OF AGE 18+ 
router.get('/usersAboveAge18' ,async (req,res) => {
    try{
        let user = await userDetails.find({"personalInformation.age" : {"$gte" : 18}});
        usernameArray = [];
        for (let i=0; i<user.length ;i++){
            usernameArray.push(user[i].userName)
        }
        res.json(usernameArray);
    }
    catch (err) {
        res.json({message : err});
    }
});

module.exports = router;
