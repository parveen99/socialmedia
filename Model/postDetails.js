const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const post = new Schema({ 
    userName :{
        type : String,
        required : true
    },
    status : {
        type : String ,
        max: 150 ,
        required : true
    }
},{
        timestamps :{
            createdAt: 'created_at',updatedAt: 'updated_at'
        }
    },
    {
        strict : false ,
        collection : 'post'
    }
);


module.exports.schema = post ;
