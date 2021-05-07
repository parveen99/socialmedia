const mongoose = require('mongoose');
const postschema = mongoose.Schema({
    _id :{
        type : String
    },
    userId :{
        type : String,
        required : true
    },
    status : {
        type : String ,
        max: 150 ,
        required : true
    },
    likes : {
        type : Array,
        default : []
    }
},
{
    timestamps : true
}
);

postschema.path('status').validate(function (v) {
    return v.length <= 150;
}, 'The maximum length is 150.');

//validator function 
module.exports = mongoose.model('post' , postschema);
