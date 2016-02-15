angular.module('app.sales',[])
.controller('salesCtrl',function($scope,$http){
    
    var token = localStorage.getItem('token');
    
    $scope.sales = {token: token};
    $scope.submit = function(){
        $http.post('/salesman', $scope.sales).then(function(success){
            console.log('Success.. ', success);
        }, function(err){
            console.log(" err " ,err)
        })
    }
})