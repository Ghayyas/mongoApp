angular.module('app.salesMan',[])
.controller('salesmanCtrl',function($scope,$http,local){
    var token = localStorage.getItem('token');
    var obj = {token: token};
    $http.post(local+'allsalesman',obj).then(function(succces){
       

        $scope.ac = succces.data.data;
        console.log("success", succces)
    }, function(err){
        console.log("err",err);
    })
    
})