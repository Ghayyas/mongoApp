
angular.module('app.signin',[])
	.controller('SignInController',function($scope,$http,$state, $location){

	$scope.user = {};

	$scope.dataArray = "";
	$scope.login = function(){
if($scope.user.name == null || $scope.user.pass == null){
    alert('Please Fill All Field');
}
else{
	 $http.post('/senddata',$scope.user).success(function(data , err){
         console.log('ddddd ' + JSON.stringify(data.user))
          if(data.user){
			 alert("Welcome....");
              $location.path("/dashboard/"+data.user._id);
           //  $state.go('/dashboard/' +data._id);
            
		 }
         
         if(data.message){
			 alert(data.message)
		 }
    })	
   .error(function(data){
	console.log("Error:" +data);
   });
}



	}
	

})