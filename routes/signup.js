const { json } = require('body-parser');
const express = require('express');
const Signupdetails = require('../Model/Signupdetails');

const router = express.Router();

const signup = require('../Model/Signupdetails');

router.post('/' ,(req,res) => {
    const signupdetails = new Signupdetails(req.body)
    
    email = req.body.email
    user = email.substring(0,email.lastIndexOf("@")) 

    signupdetails.save() . then ( data => {
        res.status(200).json(user);
    })

    .catch (err => {
        res.json({ message : err });
    });
});


module.exports = router ;
