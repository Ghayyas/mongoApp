/// <reference path="typings/tsd.d.ts" />
var datab = require("./datab");
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var userRouter = require('./users');
var port = process.env.PORT || 8000;
var app = express();
var istatic = path.resolve(__dirname, 'public');
app.use(express.static(istatic));
//let login = path.resolve(__dirname, 'public/login.html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
datab.initializeApp(app);
app.get("/", function (req, res) {
    res.sendFile(istatic + "/index.html");
});
app.use('/users', userRouter);
/*
app.get('/signup',function(req:express.Request, res:express.Response){
    let signup = path.resolve(__dirname, 'public/signup/signup.html');
    res.sendFile(signup);
});

   bcrypt.compare(Password, user['Password'], function(err, isMatch) {
                 
                    console.log(err);
                    console.log(isMatch);
                    res.json(user);
                    
                    
                })

*/
app.listen(port, function () {
    console.log('Sever is starting....');
});
