console.log("rough.js");

var myapp = angular.module('ajs', [])

myapp.controller('ajscontroller', function($scope, $http){
  $scope.title = "Pet Hotel";

  $http.get('/items/blooms').then(function(response) {
  	console.log("got data")
    console.log(response.data)
    $scope.pethotel = response.data;
  })
});


