let express = require('express');
let app = express();
let mongoose = require('mongoose');
let dotenv = require('dotenv');


dotenv.config();

//parsing the data into json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Importing Routes
let userRoute = require('./routes/userAPI');
app.use('/user',userRoute);

let postRoute = require('./routes/postAPI');
app.use('/post',postRoute);


//Connecting to Mongo DB
mongoose.connect( process.env.DB_CONNECTION , { 
    useNewUrlParser: true , 
    useUnifiedTopology: true 
    },() =>
    console.log("Connected to DB")
);

//Listening to server
app.listen(3002 , ()=> console.log("Server is Running"));
