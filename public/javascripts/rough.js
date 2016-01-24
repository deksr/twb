console.log("rough.js");

var myapp = angular.module('ajs', [])
var storeinarray = [];
var duplicategenre = [];
var dupesinarray = [];
var allresults = [];



myapp.controller('ajscontroller', function($scope, $http, $document, $window, $interval){
  $scope.title = "A hidden message to all: We are all diamonds taking shape.";


	var pageload= function(){
   // get request
		$http.get('/items/blooms').then(function(response) {
	    console.log(response.data);
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

  //note note note:  below commented out search ($scope.searchme) was written to send request to another controller. Was simply trying things and this is fully functioning. don't delete.

  // $scope.searchme =  function(){
  //   // console.log($scope.searchbox.term);
  //   $http.get('/posts/search?', {params:{"postname":$scope.searchbox.postname}}).then(function(response){
  //     $scope.searchresults = response.data
  //     var storeddata = $scope.searchresults
  //     storeinarray.push(storeddata)
  //     $scope.displayhtml = storeinarray
  //   })
  // }



  // note note: added this in autoform function *******
  // $scope.searchthis =  function(enterkey){
  //   if (enterkey.which === 13){
  //   console.log("enterkey 13 pressed");
  //   console.log($scope.searchboxterm.genres);
  //     $http.get('/items/search?', {params:{"genres":$scope.searchboxterm.genres}}).then(function(response){
  //       $scope.searchresults = response.data
  //       var storeddata = $scope.searchresults
  //       storeinarray.push(storeddata)
  //       console.log(storeinarray)
  //       $scope.displayhtml = storeinarray
  //     })
  //   }
  // }


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
    deleme.removeClass('sun');

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

   // *******keypress event for the autocomplete form in dom******



 $scope.autoform =  function(){
    console.log("one key pressed")
    // when pressed in the input form, show the orange box
    var gotacf =  angular.element($document[0].getElementsByClassName('dormantautos'))
    gotacf.addClass('autosearchbox')  

    // this again diplays the word in the searchbox
    var reactivatedom =  angular.element($document[0].getElementsByClassName('autowords'))
    reactivatedom.removeClass('wordvanishcss')
   
   
    // scenarios 1: if cursor moved outside the input field, autoform and the autofill words should hide 
    $scope.mouseleft = function(){
      console.log("mouseleft")
      var gotdome =  angular.element($document[0].getElementsByClassName('dormantautos'))
      gotacf.removeClass('autosearchbox')

      var autoword =  angular.element($document[0].getElementsByClassName('autowords'))
      autoword.addClass('wordvanishcss')
    }


    // scenarios: if cursor moved on the orange box, autoform and the autofill words should display
    $scope.mousemoveaction = function(){
      console.log("mousemoved")
      var gotacf =  angular.element($document[0].getElementsByClassName('dormantautos'))
      gotacf.addClass('autosearchbox') 

     var reactivatedom =  angular.element($document[0].getElementsByClassName('autowords'))
     reactivatedom.removeClass('wordvanishcss')
    }

    // when you press one letter, bring in the data to display on the orange box
    $http.get('/items/blooms').then(function(response) {
      console.log(response.data);
      $scope.allduplicates = response.data;

      var experiment  = response.data
      for (i = 0; i < experiment.length; i++) { 
        console.log(experiment[i].genres)
        duplicategenre.push(experiment[i].genres)
        // console.log(duplicategenre) /array containing arrays - two dimensional arrays
      }
       // array containing arrays is sent into one arras with strings
      for (i = 0; i < duplicategenre.length; i++) { 
        console.log(duplicategenre[i])
        var dupes = duplicategenre[i];
        for(var j = 0; j < dupes.length; j++) {
          // console.log(dupes[j]);
          dupesinarray.push(dupes[j])
          console.log(dupesinarray)
        } 
      }
     // to find the duplicates in the final array: 
      var a = dupesinarray.sort();
      a.filter( function(v,i,o){
        if(i>=0 && v!==o[i-1])
        allresults.push(v)
      }); 

      $scope.acb =  allresults // display the auto result inside the orange box
      $scope.searchthis =  function(enterkey){
        if (enterkey.which === 13){
        console.log("enterkey 13 pressed");
        console.log($scope.searchboxterm.genres);
          $http.get('/items/search?', {params:{"genres":$scope.searchboxterm.genres}}).then(function(response){
            $scope.searchresults = response.data
            var storeddata = $scope.searchresults
            storeinarray.push(storeddata)
            console.log(storeinarray)

            // getting search result to display on html
            angular.forEach(storeinarray, function(eachitem) {
             console.log(eachitem)
            $scope.displayhtml = eachitem
            });

            // once the search is done remove the orange searchbox 
            var gotacf =  angular.element($document[0].getElementsByClassName('dormantautos'))
            gotacf.removeClass('autosearchbox')

            // and then remove displayed words 
            var autoword =  angular.element($document[0].getElementsByClassName('autowords'))
            autoword.addClass('wordvanishcss')

            $scope.wordsvanish = true;
            $scope.searchboxterm = {}; //clear the search tab
          })
        }
      }
    })
  }

  // ******** slideshows starts here
  // note note: loading the window and document. both work. pass $window with $scope and others

  // 1. angular.element(document).ready(function () {
  //   console.log("this works ")
  // });

  angular.element($window).bind('load', function() {
    console.log("hay hay")

    var counter = 0
    var images  = ['url("/images/imageone.jpg")', 'url("/images/imagetwo.jpg")', 'url("/images/imageone.jpg")' ]

    function slideimage(){
    // console.log("slideimage")

    counter = counter + 1
    var forslide =  angular.element($document[0].getElementsByClassName('acontainer'))
    forslide.css('background-image', images[counter])

      if (counter === images.length){
          clearInterval(counter);
      }
    };

    $interval(slideimage, 3000)
  });

});

