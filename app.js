const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');


//parsing the data into json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//importing routes
const signupRoute = require('./routes/signup');
app.use ('/signup' ,signupRoute);

const userRoute = require('./routes/user');
app.use('/user' ,userRoute);

const postRoute = require('./routes/post');
app.use('/post' , postRoute);

const finalRoute = require('./routes/finalapi');
app.use('/finalapi' , finalRoute);

//connecting to Mongo DB
mongoose.connect( process.env.DB_CONNECTION , { 
    useNewUrlParser: true , 
    useUnifiedTopology: true 
    },() =>
    console.log("Connected to DB")
);

//Listening to server
app.listen(3000);
