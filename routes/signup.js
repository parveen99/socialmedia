const { json } = require('body-parser');
const express = require('express');
const Signupdetails = require('../Model/Signupdetails');
const router = express.Router();


//USER SIGNUP
router.post('/' , async (req,res) => {
    email = req.body.email
    const signupdetails = new Signupdetails({
        email : req.body.email ,
        userName : email.substring(0,email.lastIndexOf("@")),
        personalInformation : {
            firstName : req.body.personalInformation.firstName ,
            lastName : req.body.personalInformation.lastName ,
            phoneNumber : req.body.personalInformation.phoneNumber,
            DOB : req.body.personalInformation.DOB 
        } ,

        address : {
            street : req.body.address.street ,
            city : req.body.address.city ,
            pincode : req.body.address.pincode,
            state : req.body.address.state,
            country : req.body.address.country
        }
    });
    userName = signupdetails.userName
    password =signupdetails.password

    try{
    await signupdetails.save() 
    res.status(201).json({USERNAME : userName , PASSWORD : password });
    } catch (err){
        res.status(500).json({message : err});
    }
});

module.exports = router ;
