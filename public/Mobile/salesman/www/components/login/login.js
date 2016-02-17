angular.module('starter')
.controller('loginCtrl',function($scope,$http,local,$state,$rootScope){
    $scope.user = {};
    $scope.submit = function(){
        $http.post(local+ '/salessign',$scope.user).then(function(success){
            console.log('Success', success);
            $rootScope.myd = success.data.data
            localStorage.setItem('token',success.data.data.FirebaseToken);
            localStorage.setItem('usertoken',success.data.data._id);
            console.log('data', success.data.data.FirebaseToken)
            $state.go('home');
        },function(err){
            console.log('error',err);
        })
    }
})