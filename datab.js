/// <reference path="./typings/tsd.d.ts" />
var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var uniqueValidator = require("mongoose-unique-validator");
var router = express.Router();
var SALT_FACTOR = 10;
var connect = mongoose.connect('mongodb://localhost/sale');
var userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    CreatedOn: { type: Date, default: Date.now() }
});
userSchema.plugin(uniqueValidator);
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
    initializeApp: initializeApp
};
function initializeApp(app) {
    app.post('/save', function (req, res) {
        var user = new userModel({
            Name: req.body.yourName,
            UserName: req.body.user_name,
            Password: req.body.password,
            RepeatPass: req.body.repeatpass,
            Age: parseInt(req.body.age),
            Gender: req.body.gender,
        });
        user.save(function (err, success) {
            if (err) {
                res.send({ err: err, message: 'Error', data: null });
            }
            else {
                console.log(success);
                res.send({ err: null, message: "Data Posted on DataBase", data: success });
            }
        });
    });
    app.post('/senddata', function (req, res) {
        var Password = req.body.pass;
        userModel.findOne({ UserName: req.body.name }, function (err, user) {
            if (err) {
                console.log("Not found");
                console.log(err);
            }
            else {
                bcrypt.compare(Password, user['Password'], function (err, isMatch) {
                    // if (err) return cb(err);
                    //cb(null, isMatch);
                    console.log(err);
                    console.log(isMatch);
                    res.send(user);
                });
            }
        });
    });
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
