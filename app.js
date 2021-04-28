let express = require('express');
let app = express();
let signup = require('./routes/signup');
let signupuser = require('./routes/user');
let post = require('./routes/post');
let final = require('./routes/finalapi');
let mongoose = require('mongoose');
require('dotenv/config');

//parsing the data into json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/' , (res) => {
      res.send('Hi,welcome to social media');
});

app.route('/signup')
        .post(signup.getSignup);

app.route('/user')
        .get(signupuser.login);

app.route('/user/:username')
        .patch(signupuser.updatePassword)
        .delete(signupuser.deleteUser);

app.route('/user/updateany/:username')
          .patch(signupuser.updateAnyinfo);

app.route('/post')
          .post(post.createPost);

app.route('/post/like')
          .post(post.likeStatus);

app.route('/finalapi/user')
          .get(final.usersInfo);

app.route('/finalapi/status')
          .get(final.statusInfo);

app.route('/finalapi/searchuser')
          .get(final.searchUser);

app.route('/finalapi/usersage18')
          .get(final.usersAge18info);

//connecting to Mongo DB
mongoose.connect( process.env.DB_CONNECTION , { 
    useNewUrlParser: true , 
    useUnifiedTopology: true 
    },() =>
    console.log("Connected to DB")
);

//Listening to server
app.listen(3002);

module.exports = app;
