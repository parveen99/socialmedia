
let signupDetails = require('../Model/signupDetails');

//LOGIN USING USERNAME / PASSWORD
async function login (req,res) {
    if(req.body.email){
        var login = await signupDetails.findOne({email : req.body.email});
        !login && res.status(400).json({message : "User not found! Invalid emailID"});
        }
    else if(req.body.userName){
        var login = await signupDetails.findOne({userName : req.body.userName});
        !login && res.status(400).json({message : "User not found! Invalid user"});
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
};

//UPDATING PASSWORD
async function updatePassword (req,res) {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else{
        if(req.body.userName === req.params.username){
            if(!req.body.password){
                res.status(400).json({message :"Enter password to update"});
            }
            else{
                try{
                    await signupDetails.updateOne(
                        {userName : req.body.userName} ,
                        {$set:{password : req.body.password}}
                    );
                    res.status(200).json({message : "Password updated successfully"});
                }
                catch (err){
                        res.status(500).json({message : err});
                }
            }
        }
        else{
            return res.status(403).json({message:"You can update only your password"});
        }
    }
};

//DELETING A USER
async function deleteUser (req,res) {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"});
    }
    else{
        if(req.body.userName === req.params.username){
            try{
                await signupDetails.deleteOne({userName : req.params.username });
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
};


//UPDATING ANY INFORMATION
async function updateAnyinfo (req,res) {
    if(!req.body.userName){
        res.status(400).json({message : "userName is required"})
    }
    else {
        if(req.body.userName === req.params.username){
            try{
                await signupDetails.findOneAndUpdate(
                    {userName:req.body.userName},
                    {$set:req.body});
                res.status(200).json({message : "User Details Updated Successfully"});
            }
            catch (err) {
                res.status(500).json({message : err});
            }
        }
        else{
            return res.status(403).json({message : "You can update only your account"});
        }
    }
};

module.exports = { login , updatePassword ,deleteUser , updateAnyinfo } ;
