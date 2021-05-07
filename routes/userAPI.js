
let express = require('express');
let router = express.Router();
let validator = require("email-validator");
let jwt = require('jsonwebtoken');
require('dotenv/config');
let postDetails = require('../Model/postDetails');
let userDetails = require('../Model/userDetails');
let auth = require('../routes/auth');

//USER SIGNUP
router.post('/signup' ,async (req,res) => {
    try{
        let emailExist = await userDetails.findOne({email : req.body.email});
        if(emailExist){
            res.status(409).json({message : "Email already exists ! Signup with a different EmailID"});
        }
        else if(req.body.email && req.body.personalInformation.DOB){
            validEmail = emailValidator(req.body.email);
            if(validEmail === true){
                let email = req.body.email;
                let DOB = req.body.personalInformation.DOB ;
                let name =  email.substring(0,email.lastIndexOf("@"))
                let signupNew = new userDetails({
                    email : req.body.email ,
                    userName : email.substring(0,email.lastIndexOf("@")),
                    _id: name,
                    personalInformation : {
                        firstName : req.body.personalInformation.firstName ,
                        lastName : req.body.personalInformation.lastName ,
                        phoneNumber : req.body.personalInformation.phoneNumber,
                        DOB : req.body.personalInformation.DOB,
                        age : calculateAge(new Date(DOB))
                    } ,
                    address : {
                        street : req.body.address.street ,
                        city : req.body.address.city ,
                        pincode : req.body.address.pincode,
                        state : req.body.address.state,
                        country : req.body.address.country
                    }
                });
                let userName = signupNew.userName
                let password = signupNew.password
                try {
                    await signupNew.save() 
                    res.status(201).json({USERNAME : userName , PASSWORD : password });
                    } catch (err) {
                        res.status(500).json({error : err.message});
                    }
            }
            else{
                res.status(400).json({error : "Please enter a valid emailID to Signup"});
            }
        }
        else{
            res.status(400).json({error : "Email ID / DOB not given in data"});
        }
    }
    catch(err) {
        res.status(400).json({error :err.message});
    }  
});

//LOGIN USING USERNAME / PASSWORD
router.get('/login' ,async (req,res) => {
    if(req.body.email){
        var checkUserFromDBUsingEmail = await userDetails.findOne({email : req.body.email});
        if(checkUserFromDBUsingEmail){
            if(req.body.email === checkUserFromDBUsingEmail.email){
                if(req.body.password === checkUserFromDBUsingEmail.password){
                    let token = jwt.sign(
                        {_id: checkUserFromDBUsingEmail._id},
                        process.env.TOKEN_SECRET,
                        {expiresIn : 60*10}
                    );

                    msg = {
                        message : "Login Successfull" ,
                        token : token
                    }
                    res.header('auth-token',token).send(msg);
                }
                else {
                    res.status(401).json({error : "Password Incorrect"});
                }
            }
        }
        else{
            res.status(400).json({error : "User not found! Invalid emailID"});
        }
    }
    else if(req.body.userName){
        var checkUserFromDBUsingUsername = await userDetails.findOne({userName : req.body.userName});
        if(checkUserFromDBUsingUsername){
            if(req.body.userName === checkUserFromDBUsingUsername.userName){
                if(req.body.password === checkUserFromDBUsingUsername.password){
                    let token = jwt.sign(
                        {_id: checkUserFromDBUsingUsername._id},
                        process.env.TOKEN_SECRET , 
                        {expiresIn : 60*10}
                    );
                    msg = {
                        message : "Login Successfull" ,
                        token : token
                    }
                    res.header('auth-token',token).send(msg);
                }
                else {
                    res.status(401).json({error : "Password Incorrect"});
                }
            }
        }
        else{
            res.status(400).json({error  : "User not found! Invalid Username"});
        }
    }
});

//UPDATING PASSWORD
router.patch('/updatePassword', auth ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({error : "userName is required"});
    }
    else if(!req.body.oldPassword){
        res.status(400).json({error : "OldPassword is required to update"});
    }
    else if(!req.body.newPassword){
        res.status(400).json({error : "Please enter NewPassword"});
    }
    else if(req.body.oldPassword === req.body.newPassword){
        res.status(400).json({error : "OldPassword and NewPassword are same"});
    }
    else if (req.body.newPassword.length <=6 ){
        res.status(400).json({error : "Password should be atleast of 6 characters"});
    }
    else{
        const validUser = await userDetails.findOne({userName : req.body.userName ,password : req.body.oldPassword});
        if(validUser){
            try{
                await userDetails.updateOne(
                    {userName : req.body.userName} ,
                    {$set:{password : req.body.newPassword}}
                );
                res.status(200).json({message : "Password updated successfully"});
            }
            catch (err){
                res.status(500).json({error : err.message});
            }
        }
        else{
            res.status(400).json({error : "User not found! Invalid Credentials"});
        }
    }
});


//UPDATING ANY INFORMATION
router.patch('/updateUserInformation' ,auth , async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({error : "userName is required"})
    }
    else{
        const validUser = await userDetails.findOne({userName : req.body.userName});
        if(validUser){
            try{
                await userDetails.findOneAndUpdate(
                    {userName:req.body.userName},
                    {$set:req.body});
                res.status(200).json({message : "User Details Updated Successfully"});
            }
            catch (err) {
                res.status(500).json({message : err.message});
            }
        }
        else{
            res.status(400).json({error : "User not found! Invalid Credentials"});
        }
    }
});


//DELETING A USER
router.delete('/deleteUser' ,auth, async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else{
        const validUser = await userDetails.findOne({userName : req.body.userName });
        if(validUser){
            try{
                await userDetails.deleteOne({userName : req.body.userName });
                res.status(200).json({message : "User removed successfully"});
            }
            catch (err){
                res.status(500).json({error : err.message});
            }
        }
        else{
            return res.status(400).json({error : "User not found! Invalid Credentials"});
        }
    }
});

//GET USER INFORMATION
router.get('/userInformation' ,auth, async (req,res) => {
    if(!req.body.userId){
        res.json({message : "Please enter userID"});
    }
    else{
        try{
            let post = await postDetails.find({userId : req.body.userId},{status : 1});
            let user = await userDetails.findOne({_id : req.body.userId});
            let postLike = await postDetails.find({likes : req.body.userId} , {status : 1});

            //status posted by the user
            let userStatus = [];
            for (let i=0; i<post.length ; i++){
                    userStatus.push(post[i].status);
            }

            //status liked by the user
            let statusLiked = []
            for (let i=0; i < postLike.length; i++) {
                statusLiked.push(postLike[i].status);
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
                statusPosted : userStatus,
                statusLiked : statusLiked
            }

            res.status(200).json(userInformation);
        } catch (err) {
            res.status(500).json({message : err.message});
        }
    }
});

//SEARCH user
router.get('/searchUser' ,auth ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({error : "Please enter username"});
    }
    else{
        try{
            //case-insensitive search
            let user = await userDetails.find({userName: {$regex: req.body.userName , $options : "i"}}); 
            usernameArray = [];
            for (let i=0; i<user.length ;i++){
                usernameArray.push(user[i].userName)
            }
            res.json({searchResults : usernameArray});
        } catch (err) {
            res.json({error : err.message});
        }
    }
});

//users above AGE 18+ 
router.get('/usersAboveAge18' , auth ,async (req,res) => {
    try{
        let user = await userDetails.find({"personalInformation.age" : {"$gte" : 18}});
        usernameArray = [];
        for (let i=0; i<user.length ;i++){
            usernameArray.push(user[i].userName)
        }
        res.status(200).json({usersAboveAge18 : usernameArray});
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
});

//Calcuate Age from DOB
function calculateAge(DOB){
    var ageDifMs = Date.now() - DOB.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//Email Validator
function emailValidator(email){
    return validator.validate(email);
}

//

module.exports = router;
