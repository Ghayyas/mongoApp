angular.module('app.getorder',[])
.controller('getCtrl',function($scope,$http,local,$rootScope,$firebaseArray){
    var ab = localStorage.getItem('token');
    //$scope.fb = {FirebaseToken: ab}
   // console.log('ab');
   var ref = new Firebase("https://salesmanapp1.firebaseio.com/").child(ab);
   console.log("Hello",ref)
    var ref2 = ref.child('msg');
      //$scope.order = [];

              $scope.aer = false;      
            
            ref2.on('child_added', function(message) {
             //   $scope.order.push(message.val().msg)
                         $scope.aer = true;
                console.log("Hello",ref2)
                console.log('sfsdf',message.val());
               // console.log('orders are',message.val().orders[0]);
                //console.log('quantities are ',message.val().quantity[2]);
                ab = message.val();
                $scope.cd = ab.orders;
                $scope.q = ab.quantity;
                $scope.msg = $firebaseArray(ref2);

            // console.log('abce',$scope.msg);
                alert("Order Recived : " + message.val().orders + " Quantities Are : " + message.val().quantity);
               //alert('orders are',message.val().orders[0]);
               //alert('quantities are ',message.val().quantity[0]);
                })

                       console.log('cd',$scope.cd);
    $http.get(local+'/getorders?token='+ab).then(function(success){
        console.log("data",success)
        $scope.data = success.data.data;
        $scope.aer = false;
        console.log('sdf',$scope.data);
        ref.remove();
    },function(err){
        console.log("error",err);
    })
})