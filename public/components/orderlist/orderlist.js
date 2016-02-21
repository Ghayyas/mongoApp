angular.module('app.getorder',[])
.controller('getCtrl',function($scope,$http,local,$rootScope,$firebaseArray,$document){
    var ab = localStorage.getItem('token');
    
             var ref = new Firebase("https://salesmanapp1.firebaseio.com/").child(ab);
            console.log("Hello",ref)
           var  ref2 = ref.child('msg');
      //$scope.order = [];

              $scope.aer = false;      
              
              
         $scope.abc = function(){  
    $http.get(local+'getorders?token='+ab).then(function(success){
        console.log("data",success)
        $scope.data = success.data.data;
        $scope.aer = false;
        console.log('sdf',$scope.data);
        ref.remove();
    },function(err){
        console.log("error",err);
    })
      }
  
              
              
                 ref2.on('child_added', function(message) {
             //   $scope.order.push(message.val().msg)
                         $scope.aer = true;
               // console.log("Hello",ref2)
             //   console.log('sfsdf',message.val());
               // console.log('orders are',message.val().orders[0]);
                //console.log('quantities are ',message.val().quantity[2]);
                $scope.msg = $firebaseArray(ref2);
                ab = message.val();
                console.log("firebase value added ",$scope.msg);
                $scope.cd = $scope.msg.orders;
                $scope.q = $scope.msg.quantity;
                $scope.lat = $scope.msg.latitude;
                $scope.longi = $scope.msg.long;


            // console.log('abce',$scope.msg);
                alert("Order Recived : " + message.val().orders + " Quantities Are : " + message.val().quantity + " Latitude is : " +message.val().latitude + " Longitude :" + message.val().long);
               //alert('orders are',message.val().orders[0]);
               //alert('quantities are ',message.val().quantity[0]);
                })
    
    //$document.ready(function(){
     
    
    //});
    //$scope.fb = {FirebaseToken: ab}
   // console.log('ab');
  
        $scope.abc();
})