/// <reference path="./typings/tsd.d.ts" />
var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var uniqueValidator = require("mongoose-unique-validator");
var firebase = require('firebase');
var router = express.Router();
var SALT_FACTOR = 10;
var connect = mongoose.connect('mongodb://ghayyas:ghayyas@ds037165.mongolab.com:37165/salesapp');
//let connect = mongoose.connect('mongodb://localhost/salesapp');
var userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserName: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Gender: String,
    FirebaseToken: { type: String, required: true },
    Companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    CreatedOn: { type: Date, default: Date.now() }
});
userSchema.plugin(uniqueValidator);
var CompanySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyAddress: String,
    FirebaseToken: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    salesMan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'salesman' }]
});
var salesMan = new mongoose.Schema({
    CompanyName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
    ordersPlace: [],
    quantity: [],
    FirebaseToken: String,
    sName: { type: String },
    cName: String,
    CompanyID: String,
    sEmail: { type: String, required: true, unique: true },
    spass: { type: String, required: true },
    lat: String,
    long: String
});
salesMan.plugin(uniqueValidator);
var salesman = mongoose.model('salesman', salesMan);
var Company = mongoose.model('Company', CompanySchema);
var userModel = mongoose.model("users", userSchema);
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
var noop = function () { };
userSchema.pre("save", function (done) {
    var user = this;
    if (!user.isModified("Password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.Password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.Password = hashedPassword;
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
    Company: Company,
    salesman: salesman,
    initializeApp: initializeApp
};
var firebaseRef = new firebase("https://salesmanapp1.firebaseio.com/");
function initializeApp(app) {
    app.post('/company', function (req, res) {
        console.log(req.body);
        var myCompany = new Company({
            CompanyName: req.body.companyName,
            CompanyAddress: req.body.companyAddress,
            FirebaseToken: req.body.token
        });
        myCompany.save(function (err, success) {
            if (err) {
                console.log("Company Error ", err);
            }
            else {
                console.log('Company Saved ', success);
                userModel.update({ $push: { Companies: myCompany._id.toString() } }, function (e1, d1) {
                    console.log('s', e1 || 'd', d1);
                });
                //  salesman.find({},(err,data)=>{
                //      if(err){
                //          console.log(err);
                //      }
                //      else if(!data){
                //          console.log('data',data)
                //      }
                //      else{
                //   salesman.update({$push:{CompanyName: myCompany._id.toString()}},(err,suc)=>{
                //   console.log("err", err || 'success', suc)
                //     });                               
                //      }
                //  })
                res.json({ success: true, "message": "Successfully Saved Company", data: success });
            }
        });
        salesman.update({ $push: { CompanyName: myCompany._id.toString() } }, function (err, data) {
            if (err) {
                console.log("err", err);
            }
            else {
                console.log("success", data);
            }
        });
    });
    app.post('/salessign', function (req, res) {
        salesman.findOne({
            sEmail: req.body.sEmail,
            spass: req.body.spass }, function (err, data) {
            if (err) {
                console.log('singin eerr', err);
                res.json({ success: false, "msg": "Internal Error", err: err });
            }
            else {
                if (!data) {
                    console.log('userName not Found..', data);
                    res.json({ success: false, "msg": "invalid Id or Password", data: data });
                }
                else {
                    console.log('got data', data);
                    res.json({ success: true, 'msg': 'data successs', data: data });
                }
            }
        });
    });
    app.post('/ordersend', function (req, res) {
        // salesman.findOne({orderPlace:req.body.order,quantity:req.body.quantity},(err,data)=>{
        //     if(err){
        //         console.log(err);
        //         res.json({success: false, "msg": "internal Error",err:err})
        //     }
        //     else {
        //         if(!data){
        //         salesman.update({ordersPlace: req.body.order,quantity: req.body.quantity},(err,data)=>{
        //     if(err){
        //         console.log(err);
        //         res.json({success: false,"msg":"Internal Error",err:err})
        //     }
        //     else{
        //         if(!data){
        //             console.log("data not recived.." ,data);
        //             res.json({success: false,"msg":"data not send",data:data})
        //         }
        //         else{
        //             console.log('data successs',data);
        //             res.json({success:true, "msg":'Msg Send',data:data})
        //         }
        //     }
        //    })         
        //         }
        //         else{}
        //     }
        // }
        salesman.findOne({ _id: req.body.ab }, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                if (!data) {
                    console.log("no data", data);
                }
                else {
                    console.log("ID found..", data);
                    salesman.findByIdAndUpdate(req.body.ab, { $push: { ordersPlace: req.body.order, quantity: req.body.quantity } }, function (err, data) {
                        if (err) {
                            console.log(err);
                            res.json({ success: false, "msg": "Internal Error", err: err });
                        }
                        else {
                            if (!data) {
                                console.log("data not recived..", data);
                                res.json({ success: false, "msg": "data not send", data: data });
                            }
                            else {
                                console.log('data successs', data);
                                res.json({ success: true, "msg": 'Msg Send', data: data });
                            }
                        }
                    });
                }
            }
        });
    });
    app.get('/getorders', function (req, res) {
        console.log('acesd', req.query.token);
        salesman.find({ FirebaseToken: req.query.token }, function (err, data) {
            if (err) {
                console.log(err);
                res.json({ success: false, err: err });
            }
            else {
                console.log('asdff', data);
                res.json({ success: true, data: data });
            }
        });
    });
    app.post('/companyList', function (req, res) {
        Company.find({ FirebaseToken: req.body.token }, function (err, data) {
            if (err) {
                console.log("Error from List company", err);
                res.json({ success: false, "msg": 'Internal Error', err: err });
            }
            else {
                //var emptyArray : any = [];
                //var cd = emptyArray == Array.isArray(null)
                //console.log('cd is',!cd);
                if (data == Array.isArray(null)) {
                    console.log("Company not Found..", data);
                    res.json({ success: false, "msg": "company not found", data: null });
                }
                else {
                    console.log("Success", data);
                    res.json({ success: true, "msg": "Company Found", data: data });
                }
            }
        });
    });
    app.post('/slocation', function (req, res) {
        console.log('Location getting', req.body);
        salesman.find({ FirebaseToken: req.body.token }, function (err, data) {
            if (err) {
                console.log("getting error", err);
            }
            else {
                console.log('geeting response', data);
                salesman.update({ $push: { lat: req.body.lat, long: req.body.long } }, function (err, data) {
                    console.log("data", data);
                    res.json({ success: true, "msg": "successfully Recieved Data", data: data });
                });
                console.log("data is", data);
            }
        });
    });
    // app.get('/scurrentLocation',(req,res)=>{
    //     console.log("getting body",req.query.body);
    // })
    app.post('/salesman', function (req, res) {
        console.log('/salesman', req.body);
        Company.find({ FirebaseToken: req.body.token }, function (err, success) {
            if (err) {
                console.log("got err", err);
            }
            else {
                if (!success) {
                    console.log("company not found", success);
                }
                else {
                    console.log("Company FOund..", success);
                    var sales = new salesman({
                        //ordersPlace : req.body.orderplace,
                        sName: req.body.sName,
                        sEmail: req.body.sEmail,
                        spass: req.body.spass,
                        cName: req.body.cName,
                        FirebaseToken: req.body.token
                    });
                    sales.save(function (err, success) {
                        if (err) {
                            console.log('err', err);
                        }
                        else {
                            console.log("success", success);
                        }
                    });
                    Company.update({ $push: { salesMan: sales._id.toString() } }, function (err, success) {
                        if (err) {
                            console.log("unable to update Sales man ", err);
                        }
                        else {
                            console.log("success Fully saved Sales man", success);
                        }
                    });
                }
            }
        });
    });
    app.post('/allsalesman', function (req, res) {
        salesman.find({ FirebaseToken: req.body.token }, function (err, data) {
            if (err) {
                console.log('Recieveing err', err);
            }
            else {
                if (data == Array.isArray(null)) {
                    console.log("data not found", data);
                    res.json({ success: false, "msg": 'Data not found', data: data });
                }
                else {
                    console.log("Successsfsdf...", data);
                    res.json({ success: true, "msg": "Data Successs", data: data });
                }
            }
        });
    });
    app.post('/signup', function (req, res) {
        console.log(req.body);
        firebaseRef.createUser({
            email: req.body.email,
            password: req.body.password
        }, function (error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            }
            else {
                console.log("Successfully created user account with uid:", userData.uid);
                var user = new userModel({
                    Name: req.body.firstName,
                    Email: req.body.email,
                    UserName: req.body.lastName,
                    Password: req.body.password,
                    RepeatPass: req.body.password2,
                    FirebaseToken: userData.uid,
                    //Age: parseInt(req.body.age),
                    Gender: req.body.gender
                });
                user.save(function (err, success) {
                    console.log(err || success);
                    if (err) {
                        console.log(err);
                        res.json({ err: err, "message": 'Internal Error', data: null });
                    }
                    else {
                        console.log('user Saved', success);
                        res.json({ err: null, "message": "Sign Up Success", data: success });
                    }
                });
            }
        });
    });
    app.post('/login', function (req, res) {
        var Password = req.body.pass;
        userModel.findOne({ UserName: req.body.name }, function (err, user) {
            if (err) {
                console.log("Error ", err);
            }
            if (user) {
                bcrypt.compare(Password, user['Password'], function (err, isMatch) {
                    // if (err) return cb(err);
                    //cb(null, isMatch);
                    if (isMatch) {
                        console.log('Password Match');
                        res.json({ success: true, 'user': user });
                    }
                    else {
                        console.log('Password not Match', user);
                    }
                });
            }
            else {
                console.log("login failed ", user);
            }
        });
    });
    /*
    app.get('/senddata',(req,res)=>{

    })*/
}
module.exports = myExports;
/*                   success.comparePassword(req.body.pass, function(err, isMatch) {
                      if (isMatch) {
                    console.log("matched");
             } else {
                     //return done(null, false, { message: 'Incorrect password.' });

                    console.log('Not matched');
        }
                    }); */ 
