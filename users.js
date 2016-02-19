var express = require('express');
var router = express.Router();
var datab = require("./datab");
//var usersModel = require("datab");
/* GET users listing. */
// router.get('/', function (req, res) {
//     res.send('respond with a resource');
// });
router.get('/:uid', function (req, res) {
    /// console.log('usererreer')
    // datab.userModel.findOne({_id: req.params.uid}, function (err, success) {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //       //res.send(success || err);
    //     }
    // });
    datab.userModel.findOne({ _id: req.params.uid })
        .populate('Companies')
        .exec(function (err, data) {
        if (err) {
            console.log('getting error ', err);
        }
        else {
            console.log("something somthing ", data);
            res.json({ success: true, 'msg': 'data Recived', data: data });
        }
    });
});
module.exports = router;
