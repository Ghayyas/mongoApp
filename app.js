/// <reference path="typings/tsd.d.ts" />
var datab_1 = require("./datab");
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var istatic = path.resolve(__dirname, 'public');
app.use(express.static(istatic));
//let login = path.resolve(__dirname, 'public/login.html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
datab_1.initializeApp(app);
app.get("/", function (req, res) {
    res.sendFile(istatic + "/index.html");
});
/*
app.get('/signup',function(req:express.Request, res:express.Response){
    let signup = path.resolve(__dirname, 'public/signup/signup.html');
    res.sendFile(signup);
});

*/
app.listen(8000, function () {
    console.log('Sever is starting....');
});
