console.log("rough.js");

var myapp = angular.module('ajs', [])
var storeinarray = [];


myapp.controller('ajscontroller', function($scope, $http, $document){
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


  // *****************search functionality**************

  $scope.controllermessage = "from search controller welcome"
  $scope.searchme =  function(){
    // console.log($scope.searchbox.term);
    $http.get('/posts/search?', {params:{"postname":$scope.searchbox.postname}}).then(function(response){
      $scope.searchresults = response.data
      var storeddata = $scope.searchresults
      storeinarray.push(storeddata)
      $scope.displayhtml = storeinarray
    })
  }


  $scope.justry =  function(){
    // console.log($scope.searchbox.term);
    $http.get('/items/blooms').then(function(response) {
      console.log(response.data)
      $scope.tryme = response.data;
    })
  }

 

  // *********allflips for dom css and jqlite*******

  $scope.flipbutton = function(event){ 

    var getpara = angular.element(event.target).parent().parent('.card')
    getpara.addClass('sun');

     var removeme = angular.element($document[0].getElementsByClassName('card'));
    removeme.removeClass('moon')


       // **********below also works but selects every element 
    // var getpara = angular.element($document[0].getElementsByClassName('card'));
    // getpara.addClass('sun');

    // var removeme = angular.element($document[0].getElementsByClassName('card'));
    // removeme.removeClass('moon')  
  }

  $scope.flipslipper = function(){

   var betpara = angular.element(event.target).parent().parent('.card')
    betpara.addClass('sun');

    var deleme = angular.element($document[0].getElementsByClassName('card'));
    deleme.removeClass('sun') 

       // **********below also works but selects every element 
    // var betpara = angular.element($document[0].getElementsByClassName('card'));
    // betpara.addClass('moon')  
    // var deleme = angular.element($document[0].getElementsByClassName('card'));
    // deleme.removeClass('sun') 
  }


   // *******show and hide for adding form in dom******

    $scope.showaddmodel =  function(){
      $scope.showingaddmodel = true;
       var gotdome =  angular.element($document[0].getElementsByClassName('modalbox'))
       gotdome.removeClass('vanishmodal');
    }

    $scope.hidemodal = function(){
       var gotdome =  angular.element($document[0].getElementsByClassName('modalbox'))
       gotdome.addClass('vanishmodal');
    }
});


