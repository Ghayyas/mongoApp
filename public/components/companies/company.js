angular.module('app.company',[])
.controller('companyCtrl',function($scope, $http,local){
    
    var token = localStorage.getItem('token');
    console.log("token is ", token);
    $scope.company = {token: token};
    
    $scope.submit = function(){
        $http.post( local + '/company',$scope.company).then(function(success){
            console.log('Company Saved..', success)
            console.log('sdf',success.data.data._id);
            localStorage.setItem('companyID',success.data.data._id);
        }, function(err){
            console.log("saved Error");
        })
    }
})