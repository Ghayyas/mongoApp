angular.module('app.dash',[])
.controller('dashBoardCtrl',function($http, $stateParams,$scope,$location,$state, $window,local){
     var uId = $stateParams.uId;
     //$scope.companyshow = true;
     $scope.userSync = function(){
             var firebaseLocalToken = localStorage.getItem("token")
          $scope.user = {};
          $scope.Welcome = "hellllllo";
          $http.get( local+"users/" + uId).then(
            function (data) {
                $scope.user = data.data.data;
                console.log("companies ",$scope.user.Companies == null)
                if($scope.user.Companies == Array.isArray(null)){
                    $scope.companyshow = true;
                }
                else {
                    $scope.companyshow = false;
                    }
                console.log('data is ',data.data.data);
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
             $window.location.reload(true);
            $state.go('signin')
        }


});     
