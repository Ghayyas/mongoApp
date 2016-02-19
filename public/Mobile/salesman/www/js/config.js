angular.module('starter')
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('login',{
                 url: "/",
                 // template: '<p>Hello, world!</p>'

                 templateUrl: "../components/login/login.html",
                 controller: "loginCtrl"
             })
             .state('home',{
                 url:'/home',
               templateUrl: '../components/home/home.html',
                 controller:'homeCtrl',
                 loginCompulsory: true
             })
    $urlRouterProvider.otherwise('/');
})
.constant('local','https://salesman12.herokuapp.com/')

 .run(function($rootScope, $state){
        $rootScope.$on("$stateChangeStart",function(event, toState){
            var firebaseToken = localStorage.getItem('token')
            if(toState.loginCompulsory && !firebaseToken){
                event.preventDefault();
                $state.go('login');
            }
        })
    })