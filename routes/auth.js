let jwt = require('jsonwebtoken');


module.exports = function  (req,res,next){
    let token = req.header('auth-token');
    if(!token){
        res.status(401).json({message : "Access Denied"});
    }
    try{
        let verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    }catch (err) {
        res.status(400).json({message : "Invalid Token"});
    }
}
