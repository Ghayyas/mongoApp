angular.module('app.sales',[])
.controller('salesCtrl',function($scope,$http,local,$mdDialog){
    
    var token = localStorage.getItem('token');
       var cID = localStorage.getItem('companyID');
    $scope.sales = {token: token,cID:cID};
    $scope.submit = function(){
          alert("Successs...");
         $mdDialog.hide();
        $http.post(local+'salesman', $scope.sales).then(function(success){
           
            console.log('Success.. ', success);
        }, function(err){
            console.log(" err " ,err)
        })
    }
})