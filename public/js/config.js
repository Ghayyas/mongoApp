/**
 * Created by ghayyas on 12/29/15.
 */
angular.module("myapp")
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
                url: "/",
                templateUrl: "../components/home/home.html",
                controller: "HomeController"
            }
            )
            .state('signin', {
                    url: "/signin",
                    templateUrl: "../components/login/login.html",
                    controller: "SignInController"
                    
                }
            )
            .state('signup', {
                    url: "/signup",
                    templateUrl: "../components/signup/signup.html",
                    controller: "SignUpController"
                }
            )
            .state('dashboard', {
                    url: "/dashboard/:uId",
                    templateUrl: "../components/dashboard/dash.html",
                    controller: "dashBoardCtrl",
                    loginCompulsory: true
                }
            );

        $urlRouterProvider.otherwise('/')

    })
    
    .run(function($rootScope, $state){
        $rootScope.$on("$stateChangeStart",function(event, toState){
            var firebaseToken = localStorage.getItem('token')
            if(toState.loginCompulsory && !firebaseToken){
                event.preventDefault();
                $state.go('signin');
            }
        })
    })
    