angular.module('starter')
.controller('homeCtrl',function($rootScope,$http,$scope,local,$firebaseArray,$cordovaGeolocation){
    var ab = localStorage.getItem('usertoken');  
    var cd = localStorage.getItem('token');
    
    
   // var token  = localStorage.getItem('usertoken'); 
     var watchOptions = {
    timeout : 5000,
    enableHighAccuracy: false // may cause errors if true
     };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
     watch.then(
    null,
    function(err) {
      // error
      console.log("error from error", err);
     // alert('alert error',err);
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
   //  var obj = {lat:lat,long:long,token:ab}
   
//    $http.post(local+'/slocation',obj).then(function(res){
//       console.log("Location send",res);
//       //alert('alert',res);
      
//   },function(err){
//       //alert('alert error',err);
//       console.log('eror',err);
//   }
  
//   )
 
  
    
    
    
   $scope.user = {ab:ab,lat:lat,long:long};
    var ref = new Firebase("https://salesmanapp1.firebaseio.com/").child(cd);
    var ref2 = ref.child('msg');
    $scope.ac = $firebaseArray(ref2);
//    $rootScope.order = []; 
//    ref2.on('child_added',function(msg){
//        $rootScope.order.push(msg.val())
//        console.log(msg);
//    })
   $scope.submit = function(){
       if(($scope.user.order == null)|| $scope.user.quantity == null){
           alert('Please Fill all fields');
           $scope.user.order = "";
           $scope.user.quantity = "";
       }
       else{
              // var ab = localStorage.getItem('usertoken');  
            //$scope.user = {ab:ab};       
     $scope.ac.$add({
           orders: $scope.user.order,
           quantity:$scope.user.quantity,
           latitude: $scope.user.lat,
           long:$scope.user.long
          // user: $scope.user.ab
       })
   $http.post(local + 'ordersend',$scope.user).then(function(success){
       console.log('success',success);
       console.log("sdata",success.data.data);
       alert("Your Order is Send Succcessfully..");
       $scope.user.order = "";
           $scope.user.quantity = "";
       $scope.ordes = success.data.data.ordersPlace
       console.log('order',success.data.data.ordersPlace);
       $scope.quantity = success.data.data.quantity;
       console.log('quantity',success.data.data.quantity)
     
       
       
   },function(err){
       console.log('Error',err);
       alert("Some thing went Wrong.. Internal Error");
   })
   }
   }
})
});