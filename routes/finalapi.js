const { json } = require('body-parser');
const express = require('express');
const Postdetails = require('../Model/Postdetails');
const Signupdetails = require('../Model/Signupdetails');
const router = express.Router();

//USER INFORMATION
router.get('/user', async (req,res) => {
    try{
        const Post = await Postdetails.findOne({userName : req.body.userName});
        const User = await Signupdetails.findOne({userName : req.body.userName});
        const AllPosts = await Postdetails.find();
        Status_liked = [];
        for (i=0; i<AllPosts.length; i++) {
            for (j=0 ; j < AllPosts[i].likes.length ; j++){
                if(AllPosts[i].likes[j] === req.body.userName) {
                    Status_liked.push(AllPosts[i].status);
                }
            }
        }
        User_Information = {
            account_creation : User.createdAt,
            unique_username : User.userName,
            personalInformation: {
                firstName : User.personalInformation.firstName ,
                lastName : User.personalInformation.lastName ,
                phoneNumber : User.personalInformation.phoneNumber ,
                DOB : User.personalInformation.DOB
            } ,
            address : {
                street : User.address.street ,
                city : User.address.city ,
                pincode : User.address.pincode ,
                state : User.address.state ,
                country : User.address.country
            } ,
            status : Post.status ,
            Status_liked_by_user : Status_liked
        }
        res.json(User_Information);
    } catch (err) {
        res.json({message : err});
    }
});

//STATUS INFORMATION
router.get('/status' , async (req,res) => {
    try{
        const Post = await Postdetails.findOne({userName : req.body.userName});
        Status_Information = {
            number_of_likes : Post.likes.length ,
            status_creation : Post.created_at ,
            status_author : Post.userName ,
            likes : Post.likes
        }
        res.status(200).json(Status_Information);
    }catch (err) {
        res.json({message : err});
    }
});

//SEARCH A USER 
router.get('/searchuser',async (req,res) => {
    try{
        //case-insensitive search
        const User = await Signupdetails.find({userName: {$regex: req.body.userName , $options : "i"}}); 
        username_array = [];
        for (i=0; i<User.length ;i++){
            username_array.push(User[i].userName)
        }
        res.json(username_array);
    } catch (err) {
        res.json({message : err});
    }
});

//USERS OF AGE 18+ 
router.get('/usersage18' , async (req,res) => {
    try{
        const User = await Signupdetails.find({"personalInformation.age" : {"$gte" : 18}});
        username_array = [];
        for (i=0; i<User.length ;i++){
            username_array.push(User[i].userName)
        }
        res.json(username_array);
    }
    catch (err) {
        res.json({message : err});
    }
});

module.exports = router ;
