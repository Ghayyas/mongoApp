/// <reference path="typings/tsd.d.ts" />


import datab  = require("./datab");
import express = require("express");
import mongoose = require('mongoose');
import bcrpt = require("bcrypt");
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');
let firebase = require('firebase');

let userRouter = require('./users')

let port = process.env.PORT || 8000;
let app = express();

let istatic = path.resolve(__dirname,'public');


app.use(cors());


app.use(express.static(istatic));
//let login = path.resolve(__dirname, 'public/login.html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

datab.initializeApp(app);

app.get("/", function (req, res) {
	res.sendFile(istatic + "/index.html");
});

app.use('/users', userRouter)

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
 app.listen(port,()=>{
 	console.log('Sever is starting....')
 });
