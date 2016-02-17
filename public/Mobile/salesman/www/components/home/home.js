angular.module('starter')
.controller('homeCtrl',function($rootScope,$http,$scope,local,$firebaseArray){
    var ab = localStorage.getItem('usertoken');  
    var cd = localStorage.getItem('token');
   $scope.user = {ab:ab};
    var ref = new Firebase("https://salesmanapp1.firebaseio.com/").child(cd);
    var ref2 = ref.child('msg');
    $scope.ac = $firebaseArray(ref2);
//    $rootScope.order = []; 
//    ref2.on('child_added',function(msg){
//        $rootScope.order.push(msg.val())
//        console.log(msg);
//    })
   $scope.submit = function(){
     $scope.ac.$add({
           orders: $scope.user.order,
           quantity:$scope.user.quantity,
           user: $scope.user.ab
       })
   $http.post(local + '/ordersend',$scope.user).then(function(success){
       console.log('success',success);
       console.log("sdata",success.data.data)
       $scope.ordes = success.data.data.ordersPlace
       console.log('order',success.data.data.ordersPlace);
       $scope.quantity = success.data.data.quantity;
       console.log('quantity',success.data.data.quantity)
     
       
       
   },function(err){
       console.log('Error',err)
   })
   }
})