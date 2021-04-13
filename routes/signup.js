const { json } = require('body-parser');
const express = require('express');
const Signupdetails = require('../Model/Signupdetails');

const router = express.Router();

const signup = require('../Model/Signupdetails');

router.post('/' ,(req,res) => {
    const signupdetails = new Signupdetails({
        userName : req.body.userName 
    });

    signupdetails.save() . then (data => {
        res.status(200).json(data);
    })

    .catch (err => {
        res.json({ message : err });
    });

});


module.exports = router ;
