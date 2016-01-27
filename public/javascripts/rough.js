console.log("rough.js");

var myapp = angular.module('ajs', [])
var storeinarray = [];
var duplicategenre = [];
var dupesinarray = [];
var allresults = [];



myapp.controller('ajscontroller', function($scope, $http, $document, $window, $interval){
  $scope.title = "A message to all: We are all diamonds taking shape.";


	var pageload= function(){
   // get request
		$http.get('/items/blooms').then(function(response) {
	    console.log(response.data);
	    $scope.itemslist = response.data;

      // note: below is for the background image of albumart. Here $scope.itemslist.forEach does the trick and on view you can go with ng-style instead on tehe div. I was getiing an error of 10 digest scrool to see previous way of doing that gave me error. 

      var albumimage= [
      {'backgroundimage': 'url("/images/albumart/albumart1.jpg")'}, 
      {'backgroundimage': 'url("/images/albumart/albumart2.jpg")'},
      {'backgroundimage': 'url("/images/albumart/albumart4.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart5.jpg")'}
      ]

      function randalbumart(){
        var artwork = albumimage[Math.floor(Math.random() * albumimage.length)];
        console.log(artwork.backgroundimage)
        return artwork.backgroundimage
      }

      $scope.itemslist.forEach(function(art){
        art.alarw = randalbumart();
      })

	  })
	}
  
	pageload(); // when the page first loads this is called 


  // post request
  $scope.additem =  function(){
    console.log($scope.itemInputBox);
    $http.post('/items/blooms', $scope.itemInputBox).then(function(response){
      $scope.itemInputBox = {}; 
      // console.log(response.data)
      pageload(); //after a post this is called to load the page
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


            // displaying the ablbum art
           var albumimage= [
           {'backgroundimage': 'url("/images/albumart/albumart1.jpg")'}, 
           {'backgroundimage': 'url("/images/albumart/albumart2.jpg")'},
           {'backgroundimage': 'url("/images/albumart/albumart4.jpg")'},
           {'backgroundimage':  'url("/images/albumart/albumart5.jpg")'}]

            function randalbumart(){
              var artwork = albumimage[Math.floor(Math.random() * albumimage.length)];
              console.log(artwork.backgroundimage)
              return artwork.backgroundimage
            }

            $scope.displayhtml.forEach(function(art){
              art.alarw = randalbumart();
            })


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

  

// below is for show and hide of the search result.

     $scope.hide = function(){
      $scope.hidden= true 
      $scope.searchresult=  true;
    }

    $scope.showdef= function(){
      $scope.hidden = false;
      $scope.searchresult=  false;
    }

 // this is when you click the search box, add button hides and back button shows up. If you click the back button, add shows up. 

  $scope.one = function(){
    $scope.hideone = true;
    $scope.showtwo = true;
  }

  $scope.two = function(){
    $scope.hideone = false; 
    $scope.showtwo = false; 

  }
         

  // ******** slideshows starts here
  // note note: loading the window and document. both work. pass $window with $scope and others. same as doucment on load function.

  // 1. angular.element(document).ready(function () {
  //   console.log("this works ")
  // });

    // wfk%%kjhqehr< kee this it is for slides> qke######k

  angular.element($window).bind('load', function() {
    console.log("hay hay")

    var counter = 0
    var images  = ['url("/images/imageone.jpg")', 'url("/images/imagetwo.jpg")', 'url("/images/imageone.jpg")' ]

    function slideimage(){
    // console.log("slideimage")

    counter = counter + 1
    var forslide =  angular.element($document[0].getElementsByClassName('acontainer'))
    forslide.css('background-image', images[counter] )

      if (counter === images.length){
          clearInterval(counter);
      }
    };

    $interval(slideimage, 3000)

  });


    // wfkwkqr%%%%%%%%%kjhqehrqke######rhqkehrfk

  // adding album images. note:  this method works but it is wrong. this metod gives me 10 digest iteration errors as objects are getting created each time when I refresh a page meaning when angular checks back it says they dont match from what object it previously had on the dom.  Had another problem, this was inheriting time intervals. created new method in pageupload funcction.

  // $scope.randalbumart = function(){

  //   var albumimage = ['url("/images/albumart/albumart1.jpg")', 'url("/images/albumart/albumart2.jpg")', 'url("/images/albumart/albumart4.jpg")', 'url("/images/albumart/albumart5.jpg")']


  //   var artwork = albumimage[Math.floor(Math.random() * albumimage.length)];
  //   // console.log(artwork) 

  //   return {"background-image" : artwork,
  //           "background-repeat": "no-repeat",
  //           "background-size": "100%",
  //           "background-position": "center"
  //         } 
  // }



       // to hide and show**************



});

