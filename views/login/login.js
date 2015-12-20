
var app = angular.module('myapp',[]);

app.controller('appCtrl',function($scope,$http){
	
	 $http.get('/save').success(function(data){
	$scope.log = data;
    })	
   .error(function(data){
	console.log("Error:" +data);
   });		
   
	$scope.login = function(){
   
	//$scope.log = {};
	$scope.username = "";
	$scope.userpass = "";
	
	if($scope.username === $scope.log.UserName && $scope.userpass === $scope.log.Password){
		alert('True');
	}
	else{
		alert('Login failed..')
	}
	
	}
	

})