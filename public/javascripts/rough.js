console.log("rough.js");

var myapp = angular.module('ajs', [])

myapp.controller('ajscontroller', function($scope, $http){
  $scope.title = "hello";


	var pageload= function(){
		$http.get('/items/blooms').then(function(response) {
	  	console.log("got get data")
	    console.log(response.data)
	    $scope.messa = response.data;
	  })
	}
  

	pageload();

  $scope.additem =  function(){
    console.log($scope.itemyo);
    $http.post('/items/blooms', $scope.itemyo).then(function(response){
    	// $scope.itemyo = {}; this clears the input box
      $scope.itemyo = {}; 
      console.log("got the post data")
      console.log(response.data)
      pageload();
    })
  }

});


