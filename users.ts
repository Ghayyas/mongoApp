import express = require('express');
let router = express.Router();
let datab = require("./datab");
//var usersModel = require("datab");
/* GET users listing. */
// router.get('/', function (req, res) {
//     res.send('respond with a resource');
// });

router.get('/:uid', function (req, res) {
    console.log('usererreer')
    datab.userModel.findOne({_id: req.params.uid}, function (err, success) {
        if(err){
        }
        
        res.send(success || err);
    });
});

module.exports = router;