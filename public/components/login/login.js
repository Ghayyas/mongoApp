
angular.module('app.signin',[])
	.controller('SignInController',function($scope,$http){
	// var $scope = this;
	$scope.user = {};

	$scope.dataArray = "";
	$scope.login = function(){
/*		console.log($scope.user);*/
	 $http.post('/senddata',$scope.user).success(function(data){
		 console.log(data);
		 if(data.Name && data.Password){
			 alert("Welcome....")
		 }else{
			 alert("Ponkaaa")
		 }

/*
		 if($scope.dataArray==null){
			 alert('login failed');
		 }
		 else {
			 alert('succes');
		 }
		 console.log($scope.dataArray);*/
    })	
   .error(function(data){
	console.log("Error:" +data);
   });




	}
	

})