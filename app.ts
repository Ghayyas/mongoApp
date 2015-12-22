/// <reference path="typings/tsd.d.ts" />


import {initializeApp} from "./datab";
import express = require("express");
//import mongoose = require('mongoose');
import path = require('path');
import bodyParser = require('body-parser');

let app = express();

let istatic = path.resolve(__dirname,'views');
app.use(express.static(istatic));
let login = path.resolve(__dirname, 'views/login.html');
app.use(bodyParser.urlencoded({extended: false}));

initializeApp(app);

app.get('/',function(req:express.Request, res: express.Response){
//	let login = path.resolve(__dirname, 'views/login/login.html');
    res.sendfile(login);

});

app.get('/signup',function(req:express.Request, res:express.Response){
	let signup = path.resolve(__dirname, 'views/signup/signup.html');
	res.sendfile(signup);
});


app.listen(80,()=>{
	console.log('Sever is starting....')
})
