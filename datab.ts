/// <reference path="./typings/tsd.d.ts" />

import express = require('express');
import mongoose = require('mongoose');
import bcrypt = require("bcrypt-nodejs");
 let uniqueValidator = require("mongoose-unique-validator");
 let firebase = require('firebase');
 let  router = express.Router();
 let	SALT_FACTOR	=	10;
// let connect = mongoose.connect('mongodb://ghayyas:ghayyas@ds037165.mongolab.com:37165/salesapp');
let connect = mongoose.connect('mongodb://localhost/salesapp');
let userSchema = new mongoose.Schema({
	Name: {type:String, required: true},
	UserName: {type: String, required: true, unique: true},
    Email: {type: String, required: true, unique: true},
	Password: {type: String , required: true},
    Gender: String,
    FirebaseToken : {type: String, required: true},
    Companies : [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
	CreatedOn : {type: Date, default: Date.now()}
});

     userSchema.plugin(uniqueValidator);


let CompanySchema = new mongoose.Schema({
    CompanyName : {type: String, required: true},
    CompanyAddress : String,
    FirebaseToken: String,
    admin: {type: mongoose.Schema.Types.ObjectId , ref: 'userModel'},
    salesMan: [{type: mongoose.Schema.Types.ObjectId , ref:'salesman'}]
})

let salesMan = new mongoose.Schema({
   CompanyName: [{type: mongoose.Schema.Types.ObjectId, ref : 'Company'}],
   admin: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
   ordersPlace : [{type: String}],
   FirebaseToken: String,
   sName: {type: String},
   sEmail: {type: String, required: true, unique: true},
   spass: {type: String, required: true}
});

salesMan.plugin(uniqueValidator);

let salesman = mongoose.model('salesman', salesMan);

let Company = mongoose.model('Company', CompanySchema);

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
    Company:Company,
    salesman: salesman,
    initializeApp: initializeApp
}

export = myExports;

let firebaseRef = new firebase("https://salesmanapp1.firebaseio.com/");

function initializeApp(app){

    app.post('/company',(req,res)=>{
        console.log(req.body);
        let myCompany = new Company({
            CompanyName : req.body.companyName,
            CompanyAddress : req.body.companyAddress,
            FirebaseToken: req.body.token
            //admin: userModel._id,
            //salesMan : salesman._id
        })

        myCompany.save((err,success)=>{
            if(err){
                console.log("Company Error ", err);
            }
            else{

                console.log('Company Saved ',success);
                   userModel.update({$push: {Companies: myCompany._id.toString()}}, function(e1, d1){
                                    
                                console.log('s',e1 || 'd',d1);

                     })
                     salesman.find({},(err,data)=>{
                         if(err){
                             console.log(err);
                         }
                         else if(!data){
                             console.log('data',data)
                         }
                         else{
                      salesman.update({$push:{CompanyName: myCompany._id.toString()}},(err,suc)=>{
                      console.log("err", err || 'success', suc)
                        });                               
                         }
                     })

                res.json({success: true, "message": "Successfully Saved Company", data: success})
        }
        })
    })
 

    app.post('/companyList',(req,res)=>{
        Company.find({FirebaseToken: req.body.token},(err,data:any)=>{
            if(err){
                console.log("Error from List company",err);
                res.json({success: false, "msg": 'Internal Error', err:err})
            }
         
            else{ 
                   //var emptyArray : any = [];
    
                     //var cd = emptyArray == Array.isArray(null)
                        //console.log('cd is',!cd);
              if(data == Array.isArray(null)){
                console.log("Company not Found..",data);
                res.json({success: false, "msg": "company not found", data:null})
            }
            else {
                console.log("Success", data);
                res.json({success: true, "msg": "Company Found", data:data})
            }
        }
        })
    })
    app.post('/salesman',(req,res)=>{
        console.log('/salesman', req.body);
        let sales = new salesman({
        //ordersPlace : req.body.orderplace,
        sName: req.body.sName,
        sEmail: req.body.sEmail,
        spass: req.body.spass,
        FirebaseToken: req.body.token 
        })
        
        sales.save((err,success)=>{
            if(err){
                console.log("Sales man Err" ,err);
            }
            else{
                console.log("Sales man saved.." ,success);
              
                res.json({success: true, "message": "Sales Man Saved Successfully" , data: success})
                
            }
        }) 
        
    })
    
    app.post('/allsalesman',(req,res)=>{
        salesman.find({FirebaseToken: req.body.token},(err,data:any)=>{
            if(err){
                console.log('Recieveing err',err)
            }
            else{

             if(data == Array.isArray(null)){
                console.log("data not found", data);
                res.json({success:false,"msg": 'Data not found',data:data })
            }
            else {
                console.log("Success...", data);
                res.json({success: true, "msg":"Data Successs", data:data})
            }
        }
        })
    })

	app.post('/signup', (req,res)=>{
        console.log(req.body);
        firebaseRef.createUser({
        email    : req.body.email,
        password : req.body.password
        }, function(error, userData) {
         if (error) {
         console.log("Error creating user:", error);
          } else {
        console.log("Successfully created user account with uid:", userData.uid);

        let user = new userModel({


			Name: req.body.firstName,
            Email: req.body.email,
			UserName: req.body.lastName,
			Password: req.body.password,
			RepeatPass: req.body.password2,
            FirebaseToken: userData.uid,
            
			//Age: parseInt(req.body.age),
			Gender: req.body.gender
            
                       


		});
		user.save((err,success)=>{
            console.log(err || success);
			if(err){
                console.log(err);
				res.json({err : err, "message": 'Internal Error', data: null});

			}
			else{

                console.log('user Saved', success);
				res.json({err : null, "message": "Sign Up Success", data:success})
			}
		});
      }
});


	});
	app.post('/login',(req,res)=>{
        let Password = req.body.pass;
		userModel.findOne({UserName:req.body.name},(err,user )=>{

            if(err){
                console.log("Error " ,err);
                //res.json({success: false, 'message': "Internal error", error: err});
			}

			if(user){
                bcrypt.compare(Password, user['Password'], function(err, isMatch) {
                    // if (err) return cb(err);
                    //cb(null, isMatch);
                    if(isMatch) {
                        console.log('Password Match')
                        
                        res.json({ success: true, 'user': user});
                        
         
                        
                        //  let sales = new salesman({
                        //  // CompanyName: myCompany._id,
                        //   admin: user._id, 
                        //   ordersPlace : req.body.orderplace,
                        //   sName: req.body.sName,
                        //   sEmail: req.body.sEmail,
                        //   spass: req.body.spass 
                         
                        //  })
                            

                        //     sales.save((err,success)=>{
                        //         if(err){
                        //             console.log("Sales man Err" ,err);
                        //         }
                        //         else{
                        //             console.log("Sales man saved.." ,success);
                        //             res.json({success: true, "message": "Sales Man Saved Successfully" , data: success})
                                    
                        //         }
                        //     })
                        

                    //    let myCompany = new Company({
                    //     CompanyName : req.body.companyName,
                    //     CompanyAddress : req.body.companyAddress,
                    //     admin: user._id,
                    //     salesMan : sales._id
                    //         })
                         
                      
                    //    let ab = new userModel({
                    //         Companies: myCompany._id  
                    //     });
                        
                    //     ab.save((err,success)=>{
                    //         if(err){
                    //             console.log("trhoe", err)
                    //         }
                    //         else{
                    //             console.log("Company id is saved ",success);
                    //         }
                    //     })
                    
                   
                                

                        

                            // myCompany.save((err,success)=>{
                            //     if(err){
                            //         console.log("Company Error ", err);
                            //     }
                            //     else{

                            //         console.log('Company Saved ',success);
                                   
                           
                            //         res.json({success: true, "message": "Successfully Saved Company", data: success})
                            // }
                            // })
                            
                           
                        
                    } else {
                        console.log('Password not Match',user)
                      //  res.json({success: false, 'message': 'Password Not Found',data: user});
                    }
                })
                // user.comparePassword(Password, function(err, success){
				//     console.log(err + success);
				//     res.send(err + success);
                // })
            } else {
                console.log("login failed ",user);
                //res.json({'success': false, 'message': 'User Not Found', data: user});
            }



		});
	})
    /*
    app.get('/senddata',(req,res)=>{

    })*/


}

/*                   success.comparePassword(req.body.pass, function(err, isMatch) {
                      if (isMatch) {
                    console.log("matched");
             } else {
                     //return done(null, false, { message: 'Incorrect password.' });

                    console.log('Not matched');
        }
                    }); */