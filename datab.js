/// <reference path="./typings/tsd.d.ts" />
var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://localhost/sale');
var userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
    RepeatPass: { type: String, required: true },
    //Age: Number,
    //Gender: required: true,
    CreatedOn: { type: Date, default: Date.now() }
});
var userModel = mongoose.model("users", userSchema);
function initializeApp(app) {
    app.post('/save', function (req, res) {
        var user = new userModel({
            Name: req.body.yourName,
            UserName: req.body.user_name,
            Password: req.body.password,
            RepeatPass: req.body.repeatpass,
            //Age: parseInt(req.body.age),
            Gender: req.body.gender,
        });
        user.save(function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ message: "Data Posted on DataBase", data: success });
            }
        });
    });
    app.get('/senddata', function (req, res) {
        userModel.find(function (err, success) {
            if (err) {
                res.send(err);
            }
            res.json(success);
        });
    });
}
exports.initializeApp = initializeApp;
