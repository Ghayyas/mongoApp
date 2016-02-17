angular.module('app.signup', [])
    .controller("SignUpController", function ($scope, $http, $state, $location, $rootScope,local) {
        
       $rootScope.currentUser = {};

        $scope.user = {};
        $scope.send = function(){
        if($scope.user.password === $scope.user.password2){
              
         console.log("sucess");
         
         $http.post(local+'/signup',$scope.user).success(function(data){
          
          console.log('http post ', data);
          
          //localStorage.setItem('token',data.data.FirebaseToken)
          //console.log(data.data.FirebaseToken);
          $rootScope.currentuser = data.data;
          $state.go('signin');
          
            
        })
          }

          else{
              alert('password not match');
          }
          

        }
    });
    
    /*
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
	

})*/