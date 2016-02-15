angular.module('app.showCompany',[])
.controller('showCompanyCtrl',function($scope,$http){
    var token = localStorage.getItem('token');
    var abc = {token: token}
    $http.post('/companyList',abc).then(function(success){
        $scope.ac = success.data.data
        console.log("success",success)
    },function(err){
        console.log("Error", err)
    })
})