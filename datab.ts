/// <reference path="./typings/tsd.d.ts" />

import mongoose = require('mongoose');

let connect = mongoose.connect('mongodb://localhost/sale');

let userSchema = new mongoose.Schema({
	Name: {type:String, required: true},
	UserName: {type: String, required: true},
	Password: {type: String , required: true},
	RepeatPass: {type: String, required: true},
	//Age: Number,
	//Gender: required: true,
	CreatedOn : {type: Date, default: Date.now()}
});

let userModel =  mongoose.model("users",userSchema);

export function initializeApp(app){
	app.post('/save', (req,res)=>{
		let user = new userModel({
			Name: req.body.yourName,
			UserName: req.body.user_name,
			Password: req.body.password,
			RepeatPass: req.body.repeatpass,
			Age: parseInt(req.body.age),
			Gender: req.body.gender,
				
		});
		user.save((err,success)=>{
			if(err){
				res.send(err);
			}
			else{
				res.send({message: "Data Posted on DataBase", data:success})
			}
		});
	});
	app.post('/senddata',(req,res)=>{
		userModel.findOne({UserName:req.body.name, Password: req.body.pass},(err,success)=>{
			if(err){
				console.log("Not found");
				console.log(err);
			}
			else{
				console.log(success);
				res.send(success);
			}

		});
	})
	

}

