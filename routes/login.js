const { json } = require('body-parser');
const express = require('express');
const Signupdetails = require('../Model/Signupdetails');
const router = express.Router(); 

//LOGIN USING USERNAME / PASSWORD
router.get('/' ,async (req,res) => {
    try{
        const login = await Signupdetails.find(req.body);

        if((req.body.userName === login[0].userName || req.body.email === login[0].email) && req.body.password ===login[0].password ){
            res.json({message : "Login Successfull"});
        }
    }
    catch (err) {
        res.status(500).json({message : err});
    }
    
});


//DELETING A USER
router.delete('/:username' , async (req, res) => {
    try{
        await Signupdetails.remove({userName : req.params.username });
        res.json({message : "User removed successfully"});
    }
    catch (err){
        res.status(500).json({message : err});
    }

});

module.exports = router ;
