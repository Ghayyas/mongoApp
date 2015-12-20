/// <reference path="typings/tsd.d.ts" />
var datab_1 = require("./datab");
var express = require("express");
//import mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var istatic = path.resolve(__dirname, 'views');
app.use(express.static(istatic));
var login = path.resolve(__dirname, 'views/login/login.html');
app.use(bodyParser.urlencoded({ extended: false }));
datab_1.initializeApp(app);
app.get('/', function (req, res) {
    //	let login = path.resolve(__dirname, 'views/login/login.html');
    res.sendfile(login);
});
app.get('/signup', function (req, res) {
    var signup = path.resolve(__dirname, 'views/signup/signup.html');
    res.sendfile(signup);
});
app.listen(80, function () {
    console.log('Sever is starting....');
});
