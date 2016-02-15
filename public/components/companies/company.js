angular.module('app.company',[])
.controller('companyCtrl',function($scope, $http){
    
    var token = localStorage.getItem('token');
    console.log("token is ", token);
    $scope.company = {token: token};
    
    $scope.submit = function(){
        $http.post('/company',$scope.company).then(function(success){
            console.log('Company Saved..', success)
        }, function(err){
            console.log("saved Error");
        })
    }
})