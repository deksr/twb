console.log("rough.js");

var myapp = angular.module('ajs', [])

myapp.controller('ajscontroller', function($scope, $http){
  $scope.title = "hello";


	var pageload= function(){
		$http.get('/items/blooms').then(function(response) {
	  	console.log("data got")
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
      console.log("ok post")
      console.log(response.data)
      pageload();
    })
  }

  $scope.removeitem =  function(oid){
  	console.log("will you remove");
  	console.log(oid)
  	$http.delete('/items/blooms/' + oid).then(function(response){
  		pageload()
  	})
  }

  $scope.edititem =  function(oid){
    console.log("edit me");
    console.log(oid)
    $http.get('/items/blooms/' + oid).then(function(response){
      console.log("do this job")
      console.log(response)
      // $scope.itemyo = response.data
      // pageload()
      //  from here **********sjdhksjhd************

      $scope.fulldbobject = response.data
      console.log(response.data)

      console.log("from database for editing: ")
      $scope.editid = response.data._id
      // $scope.editbody = response.data.body
      // $scope.edittagline = response.data.tagline
      $scope.beyonce = response.data
      $scope.showdetail= true;
    })

    $scope.highlight = function(oid){
      console.log("puppy: "+ oid)
      $scope.hilbutton = oid
    }
  }

  $scope.update  =  function(){
    console.log("edited");
    console.log("beyonce :" + $scope.fulldbobject._id); 
    $http.put('/items/blooms/' + $scope.fulldbobject._id, $scope.beyonce).then(function(response){
      pageload()
    })
  }

});


