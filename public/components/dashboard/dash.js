angular.module('app.dash',[])
.controller('dashBoardCtrl',function($http, $stateParams,$scope,$location,$state, $window){
     var uId = $stateParams.uId;
     
     $scope.userSync = function(){
             var firebaseLocalToken = localStorage.getItem("token")
          $scope.user = {};
          $scope.Welcome = "hellllllo";
          $http.get("/users/" + uId).then(
            function (data) {
                $scope.user = data.data;
                console.log("data" + JSON.stringify(data.data));
                 
               //$scope.user = data.data;
               //console.log('scoe: ' + JSON.stringify( $scope.user) )
            },
            function (err) {
               console.log(err)
            })
          }
          $scope.userSync();
           
          
        $scope.logOut = function(){
            localStorage.removeItem('token');
             $window.location.reload();
            $state.go('signin')
        }


});     
