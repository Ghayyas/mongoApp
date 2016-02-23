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
                    loginCompulsory: true,
                    
                    }
                
            )
              .state('location', {
                    url: "/location",
                    templateUrl: "../components/location/location.html",
                    controller: "MarkerController",
                   // loginCompulsory: true,
                    
                    }
                
            )
              .state('company', {
                    url: "/company",
                    templateUrl: "../components/companies/company.html",
                    controller: "companyCtrl",
                    loginCompulsory: true
                   })
            .state('salesMan', {
                    url: "/addsales",
                    templateUrl: "../components/salesMan/sales.html",
                    controller: "salesCtrl",
                    loginCompulsory: true
                }
            ).state('companylist', {
                    url: "/companylist",
                    templateUrl: "../components/companies/showcompany.html",
                    controller: "showCompanyCtrl",
                    loginCompulsory: true
                }
            ).state('salesmanlist', {
                    url: "/saleslist",
                    templateUrl: "../components/salesMan/allsalesman.html",
                    controller: "salesmanCtrl",
                    loginCompulsory: true
                }
            ).state('orderlist', {
                    url: "/orderlist",
                    templateUrl: "../components/orderlist/orderlist.html",
                    controller: "getCtrl",
                    loginCompulsory: true
                }
            );

        $urlRouterProvider.otherwise('/')

    })
    .constant('local','http://salesman12.herokuapp.com/')
    //http://salesman12.herokuapp.com
    .run(function($rootScope, $state){
        $rootScope.$on("$stateChangeStart",function(event, toState){
            var firebaseToken = localStorage.getItem('token')
            if(toState.loginCompulsory && !firebaseToken){
                event.preventDefault();
                $state.go('signin');
            }
        })
    })
    