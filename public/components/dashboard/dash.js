angular.module('app.dash',[])
.controller('dashBoardCtrl',function($http, $stateParams,$scope){
     var uId = $stateParams.uId;
     $scope.user = {};
     $scope.Welcome = "hellllllo";
        $http.get("/users/" + uId).then(
            function (data) {
                console.log("data" + JSON.stringify(data));
                 
               $scope.user = data.data;
               console.log('scoe: ' + JSON.stringify( $scope.user) )
            },
            function (err) {
               console.log(err)
            })
    })
    /*
    .filter('capitalize', function () {
        return function (input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
})
*/