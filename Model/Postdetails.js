const mongoose = require('mongoose');
const postschema = mongoose.Schema({ 
    userName :{
        type : String,
        required : true
    },
    status : {
        type : String ,
        max: 150 ,
        required : true
    }
},  
{ timestamps :{ createdAt: 'created_at',updatedAt: 'updated_at' }}
);

postschema.path('status').validate(function(v){
    return v.length <=150;
},"The maximum length is 150 ");

module.exports = mongoose.model('Post' , postschema);
