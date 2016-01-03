console.log("rough.js");

var myapp = angular.module('ajs', [])

// myapp.controller('trycontroller', function($scope){
//   $scope.title = "hello from the other side "
// });

myapp.controller('ajscontroller', function($scope, $http){
  $scope.title = "hello";

  $http.get('/items')
});


