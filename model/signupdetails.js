const mongoose = require('mongoose');

const signupschema = mongoose.Schema({

    email : {
        type : String,
        trim : true ,
        required: true ,
        unique : true
    },
    
    password :{
        type : String ,
        trim : true ,
        default : 'social'
    } ,

    PersonalInformation : {
        firstName : {
            type : String,
            required : true,
        },
    
        lastName : {
            type : String
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

    Address : {
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
});
    

module.exports = mongoose.model('signup' , signupschema);
