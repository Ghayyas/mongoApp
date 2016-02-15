angular.module('app.salesMan',[])
.controller('salesmanCtrl',function($scope,$http){
    var token = localStorage.getItem('token');
    var obj = {token: token};
    $http.post('/allsalesman',obj).then(function(succces){
        console.log("success", succces)
    }, function(err){
        console.log("err",err);
    })
    
})