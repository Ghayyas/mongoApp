angular.module('app.getorder',[])
.controller('getCtrl',function($scope,$http,local){
    var ab = localStorage.getItem('token');
    //$scope.fb = {FirebaseToken: ab}
   // console.log('ab');
   var ref = new Firebase("https://salesmanapp1.firebaseio.com/");
    var ref2 = ref.child('msg');
      $scope.order = [];
            ref2.on('child_added', function(message) {
                $scope.order.push(message.val().msg)
                console.log('sfsdf',message.val());
                console.log('orders are',message.val().orders[0]);
                console.log('quantities are ',message.val().quantity[2]);
               // alert(message.val());
               alert('orders are',message.val().orders[0]);
               alert('quantities are ',message.val().quantity[0]);
                })
                
    $http.get(local+'/getorders?token='+ab).then(function(success){
        console.log("data",success);
        ref.remove();
    },function(err){
        console.log("error",err);
    })
})