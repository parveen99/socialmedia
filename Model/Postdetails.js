const mongoose = require('mongoose');

const postschema = mongoose.Schema({ 
    userName :{
        type : String,
        required : true
    },
    status : {
        type : String,
        max:150
    },
    likes : {
        type : Array ,
        default : []
    }
},
{ timestamps :{ createdAt: 'created_at',updatedAt: 'updated_at' }}
);

module.exports = mongoose.model('Post' , postschema);
