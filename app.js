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


//Routes
app.get('/',(req,res) =>{
    res.send("This is home page");
} );

//connecting to Mongo DB
mongoose.connect( process.env.DB_CONNECTION , { 
    useNewUrlParser: true , 
    useUnifiedTopology: true 
    },() =>
    console.log("Connected to DB")
);

//Listening to server

app.listen(3000);
