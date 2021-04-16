const mongoose = require('mongoose');

const signupschema = mongoose.Schema({

    email : {
        type : String,
        trim : true ,
        required: true ,
        unique : true
    },

    userName : {
        type : String,
        unique : true
    },
    
    password :{
        type : String ,
        trim : true ,
        default : 'social'
    },

    personalInformation : {
        firstName : {
            type : String ,
            required : true ,
            trim : true
        },
    
        lastName : {
            type : String ,
            trim : true
        },

        phoneNumber : {
            type : Number ,
            trim : true
        },

        DOB : {
            type : Date ,
            trim : true ,
            required : true
        }
    },
    
    address : {
        street : {
            type : String,
            trim : true 
        },

        city : {
            type : String ,
            trim : true 
        },

        pincode :{
            type : Number ,
            trim : true ,
            required : true
        },

        state : {
            type : String ,
            trim : true ,
            required : true
        },

        country : {
            type : String ,
            trim : true ,
            required : true
        }
    }
},
{timestamps : true}
);
    
module.exports = mongoose.model('signup' , signupschema);
