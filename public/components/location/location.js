angular.module('app.loc',[])

.controller("MarkerController", [ '$scope', function($scope) {
    alert("ponka")
    angular.extend($scope, {
        osloCenter: {
            lat: 59.91,
            lng: 10.75,
            zoom: 12
        }
    });
}]);