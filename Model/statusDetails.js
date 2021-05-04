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
},
// {
//     strict : false ,
//     collection : 'status'
// }
);


//module.exports.statusschema = status ;
module.exports = mongoose.model('status' , statusschema);
