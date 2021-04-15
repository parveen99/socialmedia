const { json } = require('body-parser');
const express = require('express');
const Signupdetails = require('../Model/Signupdetails');
const router = express.Router();

router.post('/' ,(req,res) => {
    email = req.body.email
    const signupdetails = new Signupdetails({
        email : req.body.email ,
        userName : email.substring(0,email.lastIndexOf("@")),
        PersonalInformation : {
            firstName : req.body.PersonalInformation.firstName ,
            lastName : req.body.PersonalInformation.lastName ,
            phoneNumber : req.body.PersonalInformation.phoneNumber,
            DOB : req.body.PersonalInformation.DOB 
        } ,

        Address : {
            street : req.body.Address.street ,
            city : req.body.Address.city ,
            pincode : req.body.Address.pincode,
            state : req.body.Address.state,
            country : req.body.Address.country
        }
    });
    userName = signupdetails.userName
    password =signupdetails.password
    signupdetails.save() 
        .then (doc =>  {
            res.status(200).json({USERNAME : userName , PASSWORD : password });
        })
        .catch (err => {
            res.json({ message : err });
        });
});


module.exports = router ;
