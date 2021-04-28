
const postDetails = require('../Model/Postdetails');
const signupDetails = require('../Model/Signupdetails');
const statusDetails = require('../Model/Statusdetails');

//USER INFORMATION
async function usersInfo (req,res) {
    if(!req.body.userName){
        res.json({message : "Please enter username"});
    }
    else{
        try{
            let Posts = await postDetails.find({userName : req.body.userName});
            let User = await signupDetails.findOne({userName : req.body.userName});
            let Status = await statusDetails.find();

            //Status posted by the User
            userStatus = [];
            for (let i=0; i<Posts.length ; i++){
                userStatus.push(Posts[i].status);
            }

            //Status liked by the User
            statusLiked = []
            for (let i=0; i < Status.length; i++) {
              for (let j=0 ; j < Status[i].likes.length ; j++){
                  if(Status[i].likes[j] === req.body.userName){
                      statusLiked.push(Status[i].status);
                  }
              }
            }

            userInformation = {
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
                statusPosted : userStatus,
                statusLiked : statusLiked
            }

            res.status(200).json(userInformation);
        } catch (err) {
            res.status(500).json({message : err});
        }
    }
};

//STATUS INFORMATION
async function statusInfo (req,res)  {
    if(!req.body.status){
        res.status(400).json({message : "Please enter status"});
    }
    else{
        try{
            let Post = await postDetails.findOne({status : req.body.status});
            let Status = await statusDetails.findOne({status : req.body.status});
            statusInformation = {
                number_of_likes : Status.likes.length ,
                status_creation : Post.created_at ,
                status_author : Status.userName ,
                likes : Status.likes
            }
            res.status(200).json(statusInformation);
        }catch (err) {
            res.json({message : err});
        }
    }
};

//SEARCH A USER 
async function searchUser (req,res)  {
    if(!req.body.userName){
        res.status(400).json({message : "Please enter username"});
    }
    else{
        try{
            //case-insensitive search
            let User = await signupDetails.find({userName: {$regex: req.body.userName , $options : "i"}}); 
            usernameArray = [];
            for (let i=0; i<User.length ;i++){
                usernameArray.push(User[i].userName)
            }
            res.json(usernameArray);
        } catch (err) {
            res.json({message : err});
        }
    }
};

//USERS OF AGE 18+ 
async function usersAge18info (req,res)  {
    try{
        let User = await signupDetails.find({"personalInformation.age" : {"$gte" : 18}});
        usernameArray = [];
        for (let i=0; i<User.length ;i++){
            usernameArray.push(User[i].userName)
        }
        res.json(usernameArray);
    }
    catch (err) {
        res.json({message : err});
    }
};

module.exports ={usersInfo,statusInfo,searchUser,usersAge18info} ;
