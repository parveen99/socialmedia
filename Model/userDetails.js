const mongoose = require('mongoose');
const arrayValidator = require ('mongoose-array-validator');

const userschema = mongoose.Schema({

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
            type : Array ,
            minItems : 1 ,
            maxItems : 2 ,
            items : {
                type : Number
            },
            uniqueItems:true
        },

        DOB : {
            type : String ,
            trim : true ,
            required : true
        },

        age : {
            type : Number
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
{
    timestamps : true
}
// {
//     strict : false ,
//     collection : 'user'
// }

);
userschema.plugin(arrayValidator);
    
module.exports = mongoose.model('user' , userschema);
