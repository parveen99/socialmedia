const e = require('express');
let express = require('express');
let router = express.Router();
let userDetails = require('../Model/userDetails');

//USER SIGNUP
router.post('/signup' ,async (req,res) => {
    try{
        let emailExist = await userDetails.findOne({email : req.body.email});
        if(emailExist){
            res.status(409).json({message : "Email already exists ! Signup with a different EmailID"});
        }
        else if(req.body.email && req.body.personalInformation.DOB){
            let email = req.body.email;
            let DOB = req.body.personalInformation.DOB ;
            let signupNew = new userDetails({
                email : req.body.email ,
                userName : email.substring(0,email.lastIndexOf("@")),
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
                    res.status(500).json({message : err});
                }
        }
        else {
            res.status(400).json({message : "Email ID / DOB not given in data"});
        }
    }catch(err) {
        res.status(400).json({message:err});
    }  
});

//LOGIN USING USERNAME / PASSWORD
router.get('/login' ,async (req,res) => {
    if(req.body.email){
        var checkUserFromDBUsingEmail = await userDetails.findOne({email : req.body.email});
        if(checkUserFromDBUsingEmail){
            if(req.body.email === checkUserFromDBUsingEmail.email){
                if(req.body.password === checkUserFromDBUsingEmail.password){
                    res.status(200).json({message : "Login Successfull"});
                }
                else {
                    res.status(401).json({message : "Password Incorrect"});
                }
            }
        }
        else{
            res.status(400).json({message : "User not found! Invalid emailID"});
        }
    }
    else if(req.body.userName){
        var checkUserFromDBUsingUsername = await userDetails.findOne({userName : req.body.userName});
        if(checkUserFromDBUsingUsername){
            if(req.body.userName === checkUserFromDBUsingUsername.userName){
                if(req.body.password === checkUserFromDBUsingUsername.password){
                    res.status(200).json({message : "Login Successfull"});
                }
                else {
                    res.status(401).json({message : "Password Incorrect"});
                }
            }
        }
        else{
            res.status(400).json({message : "User not found! Invalid Username"});
        }
    }
});

//UPDATING PASSWORD
router.patch('/updatePassword' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else if(!req.body.oldPassword){
        res.status(400).json({message : "OldPassword is required to update"});
    }
    else if(!req.body.newPassword){
        res.status(400).json({message : "Please enter NewPassword"});
    }
    else if(req.body.oldPassword === req.body.newPassword){
        res.status(400).json({message : "OldPassword and NewPassword are same"});
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
                res.status(500).json({message : err});
            }
        }
        else{
            res.status(400).json({message : "User not found! Invalid Credentials"});
        }
    }
});




//UPDATING ANY INFORMATION
router.patch('/updateUserInformation' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"})
    }
    else{
        const validUser = await userDetails.findOne({userName : req.body.userName ,password : req.body.password});
        if(validUser){
            try{
                await userDetails.findOneAndUpdate(
                    {userName:req.body.userName},
                    {$set:req.body});
                res.status(200).json({message : "User Details Updated Successfully"});
            }
            catch (err) {
                res.status(500).json({message : err});
            }
        }
        else{
            res.status(400).json({message : "User not found! Invalid Credentials"});
        }
    }
});


//DELETING A USER
router.delete('/deleteUser' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else{
        const validUser = await userDetails.findOne({userName : req.body.userName ,password : req.body.password});
        if(validUser){
            try{
                await userDetails.deleteOne({userName : req.body.userName });
                res.status(200).json({message : "User removed successfully"});
            }
            catch (err){
                res.status(500).json({message : err});
            }
        }
        else{
            return res.status(400).json({message : "User not found! Invalid Credentials"});
        }
    }
});

//Calcuate Age from DOB
function calculateAge(DOB){
    var ageDifMs = Date.now() - DOB.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = router;
