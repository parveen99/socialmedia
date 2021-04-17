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
            status : Post.status
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

module.exports = router ;
