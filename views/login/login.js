
var app = angular.module('myapp',[]);

app.controller('appCtrl',function($scope,$http){
	 $scope.self = this;
     self.dataArray = "";
	 $http.get('/senddata').success(function(data){
	self.dataArray = data;
    })	
   .error(function(data){
	console.log("Error:" +data);
   });		
       $scope.user = {};
   	$scope.user.name = "";
       $scope.user.pass = "";
	$scope.login = function(){
   
	//$scope.log = {};


	//$scope.user.pass = "";
	
      if($scope.user.name == self.dataArray.UserName){
		alert('True');
	}
	else{
		alert('Login failed..')
	}
	
	}
	

})