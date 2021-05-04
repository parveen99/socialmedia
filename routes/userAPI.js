let express = require('express');
let router = express.Router();
let userDetails = require('../Model/userDetails');

//USER SIGNUP
router.get('/signup' ,async (req,res) => {
    try{
        let emailExist = await userDetails.findOne({email : req.body.email});
        if(emailExist){
            res.status(409).json({message : "Email already exists ! Signup with a different EmailID"});
        }
        else if(req.body.email && req.body.personalInformation.DOB){
            let email = req.body.email;
            let DOB = req.body.personalInformation.DOB ;
            function calculateAge(DOB){
                var ageDifMs = Date.now() - DOB.getTime();
                var ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
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
            userName = signupNew.userName
            password = signupNew.password
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
        var login = await userDetails.findOne({email : req.body.email});
        if(!login){
            res.status(400).json({message : "User not found! Invalid emailID"});
        }
    else if(req.body.userName){
        var login = await userDetails.findOne({userName : req.body.userName});
        if(!login){
            res.status(400).json({message : "User not found! Invalid user"});
        }
    
    if(login){
    if (req.body.email){
            if(req.body.email === login.email && req.body.password === login.password){
                res.status(200).json({message : "Login Successfull"}); 
                }
            else {
                res.status(401).json({message : "Email / Password Incorrect"});
                }
        }

    else if(req.body.userName){
            if(req.body.userName === login.userName && req.body.password === login.password){
                    res.status(200).json({message : "Login Successfull"});
                }
            else {
                res.status(401).json({message : "UserName / Password Incorrect"});
                }
        }
    }
    }
}
});

//UPDATING PASSWORD
router.patch('/updatePassword' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else{
        try{
            await userDetails.updateOne(
                {userName : req.body.userName} ,
                {$set:{password : req.body.password}}
            );
                res.status(200).json({message : "Password updated successfully"});
            }
            catch (err){
                res.status(500).json({message : err});
            }
        }
});




//UPDATING ANY INFORMATION
router.patch('/updateUserinformation' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"})
    }
    else {
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
});


//DELETING A USER
router.delete('/deleteUser' ,async (req,res) => {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else{
        if(req.body.userName === req.params.username){
            try{
                await userDetails.deleteOne({userName : req.params.username });
                res.status(200).json({message : "User removed successfully"});
            }
            catch (err){
                res.status(500).json({message : err});
            }
        }
        else{
            return res.status(403).json({message : "You can only delete your account"});
        }
    }
});

module.exports = router;
