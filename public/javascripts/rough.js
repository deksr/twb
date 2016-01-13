console.log("rough.js");

var myapp = angular.module('ajs', [])

myapp.controller('ajscontroller', function($scope, $http){
  $scope.title = "We are all diamonds taking shape";


	var pageload= function(){
   // get request
		$http.get('/items/blooms').then(function(response) {
	    // console.log(response.data)
	    $scope.itemslist = response.data;
	  })
	}
  
	pageload();


  // post request
  $scope.additem =  function(){
    console.log($scope.itemInputBox);
    $http.post('/items/blooms', $scope.itemInputBox).then(function(response){
      $scope.itemInputBox = {}; 
      // console.log(response.data)
      pageload();
    })
  }

  // delete request
  $scope.removeitem =  function(oid){
  	// console.log(oid)
  	$http.delete('/items/blooms/' + oid).then(function(response){
  		pageload()
  	})
  }

  // edit request
  $scope.edititem =  function(oid){
    // console.log(oid)
    $http.get('/items/blooms/' + oid).then(function(response){
      // console.log(response)
      // console.log(response.data)
      $scope.fulldbobject = response.data //save one object in scope for sending back to server an id later
      $scope.editdataid = response.data._id
      $scope.itemEditBox = response.data
      $scope.showdetail= true;
    })

    $scope.highlight = function(oid){
      // console.log(oid)
      $scope.highlightbutton = oid
    }
  }

  $scope.update  =  function(){
    // console.log($scope.fulldbobject._id); 
    $http.put('/items/blooms/' + $scope.fulldbobject._id, $scope.itemEditBox).then(function(response){
      pageload()
    })
  }

});

// ***************seacrhcontroller*******************************************
myapp.controller('searchcontroller', function($scope, $http){
  console.log("from searchcontroller")

  $scope.controllermessage = "from search controller welcome"

  $scope.searchme =  function(){
    // console.log($scope.searchbox.term);
    $http.get('/posts/search?', {params:{"postname":$scope.searchbox.postname}}).then(function(response){
      console.log(response)
      $scope.searchresults = response.data
      // $scope.searchbox = {}; 
    })
  }


  $scope.justry =  function(){
    // console.log($scope.searchbox.term);
   $http.get('/items/blooms').then(function(response) {
      console.log(response.data)
      $scope.tryme = response.data;
    })
  }
})


