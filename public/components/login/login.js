
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
        // console.log('data',success.data.user.FirebaseToken)
        // console.log('login data ' + JSON.stringify(success.data))
          if(success.data.user){

			 
             localStorage.setItem('token',success.data.user.FirebaseToken);
             //console.log(success.data.user.FirebaseToken);
            // $rootScope.currentUser  = success;
             alert("Welcome User");
             
             
              $location.path("/dashboard/"+success.data.user._id);
             //$state.go('/dashboard/' +data._id);
            
		 }
         else{
            // console.log('sdfafsf',success);
             if(success.data.err == null){
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
