
angular.module('app.signin',[])
	.controller('SignInController',function($scope,$http,$state, $location){

	$scope.user = {};

	$scope.dataArray = "";
	$scope.login = function(){

	 $http.post('/senddata',$scope.user).success(function(data){
		 //console.log(data);
		 if(data){
			 alert("Welcome....");
             console.log(data);
              $location.path("/dashboard/"+data._id);
           //  $state.go('/dashboard/' +data._id);
            
		 }else{
			 alert("password not matched")
		 }
    })	
   .error(function(data){
	console.log("Error:" +data);
   });




	}
	

})