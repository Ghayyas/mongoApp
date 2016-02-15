
angular.module('app.signin',[])
	.controller('SignInController',function($scope,$http,$state, $location,$rootScope){

	$scope.user = {};
    $rootScope.currentUser = {};
	$scope.dataArray = "";
	$scope.login = function(){
         if($scope.user.name == null || $scope.user.pass == null){
    alert('Please Fill All Field');
}
else{
	 $http.post('/login',$scope.user).success(function(data, err){
         console.log('login data ' + JSON.stringify(data.user))
          if(data.user){
			 
             localStorage.setItem('token',data.user.FirebaseToken);
             console.log(data.user.FirebaseToken);
             $rootScope.currentUser  = data;
             alert("Welcome....");
             
             
              $location.path("/dashboard/"+data.user._id);
             //$state.go('/dashboard/' +data._id);
            
		 }
         
         if(data.message){
			 alert(data.message)
		 }
    })	
   .error(function(data){
       console.log('this is the error');
	console.log("Error:" +data);
   });
}



	}
	

})