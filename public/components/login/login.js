
angular.module('app.signin',[])
	.controller('SignInController',function($scope,$http,$state, $location,$rootScope,local){

	$scope.user = {};
    $rootScope.currentUser = {};
	$scope.dataArray = "";
	$scope.login = function(){
         if($scope.user.name == null || $scope.user.pass == null){
    alert('Please Fill All Field');
}


    else{
	 $http.post(local+'login',$scope.user).then(function(success){
         console.log('data',success)
         console.log('login data ' + JSON.stringify(success.user))
          if(success.user){

			 
             localStorage.setItem('token',success.user.FirebaseToken);
             console.log(success.user.FirebaseToken);
             $rootScope.currentUser  = success;
             alert("Welcome User");
             
             
              $location.path("/dashboard/"+success.user._id);
             //$state.go('/dashboard/' +data._id);
            
		 }
         else{
             console.log('sdfafsf',success);
             if(success == null){
                 alert("user Not FOund...");
             }
         }
         
         
    },function(err){
       //console.log('');
	console.log("Error:" +err);
   })	
   
}



	}
	

})
