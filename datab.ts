/// <reference path="./typings/tsd.d.ts" />

import express = require('express');
import mongoose = require('mongoose');
import bcrypt = require("bcrypt-nodejs");
 let uniqueValidator = require("mongoose-unique-validator");
 let  router = express.Router();
 let	SALT_FACTOR	=	10;
let connect = mongoose.connect('mongodb://ghayyas:ghayyas@ds037165.mongolab.com:37165/salesapp');

let userSchema = new mongoose.Schema({
	Name: {type:String, required: true},
	UserName: {type: String, required: true, unique: true},
	Password: {type: String , required: true},

	CreatedOn : {type: Date, default: Date.now()}
});
userSchema.plugin(uniqueValidator);

let userModel =  mongoose.model("users",userSchema);
/*
router.get('/',function(req,res){
    console.log('res');
    res.send("Response")
});

router.get("/:uid",function(req,res){
    userModel.findOne({_id: req.params.uid},function(err,success){
     console.log(success || err);
     res.send(success || err);        
    })
})
*/
var	noop	=	function()	{};																																	
	
userSchema.pre("save",	function(done)	{																			
		var	user	=	this;																																								
		if	(!user.isModified("Password"))	{																					
				return	done();																																								
		}
        bcrypt.genSalt(SALT_FACTOR,	function(err,	salt)	{							
				if	(err)	{	return	done(err);	}
				bcrypt.hash(user.Password,	salt,	noop,
				function(err,	hashedPassword)	{																			
						if	(err)	{	return	done(err);	}
						user.Password	=	hashedPassword;																				
						done();																																													
				});
		});
});
    // userSchema. .methods.comparePassword = function(candidatePassword, cb) {
    // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //     if (err) return cb(err);
    //     cb(null, isMatch);
    // });
//};

        var myExports = {
    userModel: userModel,
    initializeApp: initializeApp
}

export = myExports;

function initializeApp(app){
	app.post('/save', (req,res)=>{
        console.log(req.body);
		let user = new userModel({
			Name: req.body.firstName,
			UserName: req.body.lastName,
			Password: req.body.password,
			RepeatPass: req.body.password2,
			//Age: parseInt(req.body.age),
			Gender: req.body.gender,
				
		});
		user.save((err,success)=>{
            console.log(err || success);
			if(err){
				res.send({err : err, message: 'Error', data: null});
			}
			else{
                
                console.log(success);
				res.send({err : null, message: "Data Posted on DataBase", data:success})
			}
		});
	});
	app.post('/senddata',(req,res)=>{
        let Password = req.body.pass;
		userModel.findOne({UserName:req.body.name},(err,user )=>{
			 
            if(err){
                res.send({'success': false, 'message': 'err'});
			}
            
			if(user){
                bcrypt.compare(Password, user['Password'], function(err, isMatch) {
                    // if (err) return cb(err);
                    //cb(null, isMatch);
                    if(isMatch) {
                        console.log('1')
                        res.json({'success': true, 'user': user});
                    } else {
                        console.log('1')
                        res.json({'success': false, 'message': 'Password Not Found'});
                    }
                })
                // user.comparePassword(Password, function(err, success){
				//     console.log(err + success);
				//     res.send(err + success);                    
                // })
            } else {
                res.json({'success': false, 'message': 'User Not Found'});     
            }
            
           

		});
	})
	

}

/*                   success.comparePassword(req.body.pass, function(err, isMatch) {
                      if (isMatch) {
                    console.log("matched");
             } else {
                     //return done(null, false, { message: 'Incorrect password.' });
                
                    console.log('Not matched');    
        }
                    }); */