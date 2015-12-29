/// <reference path="typings/tsd.d.ts" />


import {initializeApp} from "./datab";
import express = require("express");
import mongoose = require('mongoose');
import path = require('path');
import bodyParser = require('body-parser');

let app = express();

let istatic = path.resolve(__dirname,'public');
app.use(express.static(istatic));
//let login = path.resolve(__dirname, 'public/login.html');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

initializeApp(app);

app.get("/", function (req, res) {
	res.sendFile(istatic + "/index.html");
});

/*
app.get('/signup',function(req:express.Request, res:express.Response){
	let signup = path.resolve(__dirname, 'public/signup/signup.html');
	res.sendFile(signup);
});

*/
app.listen(8000,()=>{
	console.log('Sever is starting....')
});
