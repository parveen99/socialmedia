
const signupDetails = require('../Model/Signupdetails');

//USER SIGNUP
async function getSignup (req,res) {
    try{
        let emailExist = await signupDetails.findOne({email : req.body.email});
        if(emailExist){
            res.status(409).json({message : "Email already exists ! Signup with a different EmailID"});
        }
        else if(req.body.email && req.body.personalInformation.DOB){
            email = req.body.email;
            DOB = req.body.personalInformation.DOB ;
            function calculateAge(DOB){
                var ageDifMs = Date.now() - DOB.getTime();
                var ageDate = new Date(ageDifMs);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            }
            let signupnew = new signupDetails({
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
            userName = signupnew.userName
            password = signupnew.password
            try {
                await signupnew.save() 
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
};

module.exports = {getSignup} ;
