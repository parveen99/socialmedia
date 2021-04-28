const mongoose = require('mongoose');
const statusschema = mongoose.Schema({ 
    userName : {
        type : String,
        required : true
    },
    status :{
        type : String,
        required : true
    },
    likes : {
        type : Array
    }
});

module.exports = mongoose.model('Status' , statusschema);
