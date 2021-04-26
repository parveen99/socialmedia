const mongoose = require('mongoose');
//var validate = require('mongoose-validator');

const postschema = mongoose.Schema({ 
    userName :{
        type : String,
        required : true
    },
    status : {
        type : Array ,
        items : {
            type : String ,
            max: 20 ,
            required : true
        },
    },
    likes : {
        type : Array ,
        default : []
    }
},
{ timestamps :{ createdAt: 'created_at',updatedAt: 'updated_at' }}
);

// var stringValidator = [ validate({validator : 'isLength' , arguments : [1,150] , message : 'Max size is 150 characters'})]
postschema.path('status').validate(function(v){
    console.log(v);
    return v.length <=20;
},"The maximum length is 150 ");

module.exports = mongoose.model('Post' , postschema);
