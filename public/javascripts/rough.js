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
      $scope.itemslist = response.data;

      var albumimage= [ 
      {'backgroundimage': 'url("/images/albumart/albumart4.jpg")'},
      {'backgroundimage': 'url("/images/albumart/albumart2.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart3.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart6.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart7.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart9.jpg")'}
      ]

      function randalbumart(){
        var artwork = albumimage[Math.floor(Math.random() * albumimage.length)];
        return artwork.backgroundimage
      }

      $scope.itemslist.forEach(function(art){
        art.alarw = randalbumart();
      })

    })
  }
  
  pageload(); 


  // post request
  $scope.additem =  function(){
    $http.post('/items/blooms', $scope.itemInputBox).then(function(response){
      $scope.itemInputBox = {}; 
      pageload(); 
    })
  }

  // delete request
  $scope.removeitem =  function(oid){
    $http.delete('/items/blooms/' + oid).then(function(response){
      pageload()
    })
  }

  // edit request
  $scope.edititem =  function(oid){
    $http.get('/items/blooms/' + oid).then(function(response){
      $scope.fulldbobject = response.data 
      $scope.editdataid = response.data._id
      $scope.itemEditBox = response.data
      $scope.showdetail= true;
    })

    $scope.highlight = function(oid){
      $scope.highlightbutton = oid
    }
  }

  $scope.update  =  function(){
    $http.put('/items/blooms/' + $scope.fulldbobject._id, $scope.itemEditBox).then(function(response){
      pageload()
    })
  }

  // *********allflips for dom css and jqlite*******
  $scope.flipbutton = function(event){ 
    var getpara = angular.element(event.target).parent().parent('.card')
    getpara.addClass('sun');

     var removeme = angular.element($document[0].getElementsByClassName('card'));
    removeme.removeClass('moon')
  }

  $scope.flipsback= function(){

   var betpara = angular.element(event.target).parent().parent('.card')
    betpara.addClass('sun');

    var deleme = angular.element($document[0].getElementsByClassName('card'));
    deleme.removeClass('sun');
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



   // *******search functionality******
  $scope.autoform =  function(){
    // when pressed in the input form, show the orange box
    var gotacf =  angular.element($document[0].getElementsByClassName('dormantautos'))
    gotacf.addClass('autosearchbox')  

    // this again diplays the word in the searchbox
    var reactivatedom =  angular.element($document[0].getElementsByClassName('autowords'))
    reactivatedom.removeClass('wordvanishcss')
   
    // scenarios 1: if cursor moved outside the input field, autoform and the autofill words should hide 
    $scope.mouseleft = function(){
      var gotdome =  angular.element($document[0].getElementsByClassName('dormantautos'))
      gotacf.removeClass('autosearchbox')

      var autoword =  angular.element($document[0].getElementsByClassName('autowords'))
      autoword.addClass('wordvanishcss')
    }


    // scenarios: if cursor moved on the orange box, autoform and the autofill words should display
    $scope.mousemoveaction = function(){
      var gotacf =  angular.element($document[0].getElementsByClassName('dormantautos'))
      gotacf.addClass('autosearchbox') 

     var reactivatedom =  angular.element($document[0].getElementsByClassName('autowords'))
     reactivatedom.removeClass('wordvanishcss')
    }

    // when you press one letter, bring in the data to display on the orange box
    $http.get('/items/blooms').then(function(response) {
      $scope.allduplicates = response.data;


      var experiment  = response.data
      for (i = 0; i < experiment.length; i++) { 
        duplicategenre.push(experiment[i].genres)
      }
       // array containing arrays is sent into one arras with strings
      for (i = 0; i < duplicategenre.length; i++) { 
        var dupes = duplicategenre[i];
        for(var j = 0; j < dupes.length; j++) {
          dupesinarray.push(dupes[j])
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
          $http.get('/items/search?', {params:{"genres":$scope.searchboxterm.genres}}).then(function(response){
            $scope.searchresults = response.data

            var storeddata = $scope.searchresults
            storeinarray.push(storeddata)

            // getting search result to display on html
            angular.forEach(storeinarray, function(eachitem) {
            $scope.displayhtml = eachitem
            });

            // displaying the ablbum art
           var albumimage= [ 
      {'backgroundimage': 'url("/images/albumart/albumart4.jpg")'},
      {'backgroundimage': 'url("/images/albumart/albumart2.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart3.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart6.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart7.jpg")'},
      {'backgroundimage':  'url("/images/albumart/albumart9.jpg")'} 
      ]

            function randalbumart(){
              var artwork = albumimage[Math.floor(Math.random() * albumimage.length)];
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
  angular.element($window).bind('load', function() {
    var counter = 0
    var images  = ['url("/images/imageone.jpg")', 'url("/images/imagetwo.jpg")', 'url("/images/imageone.jpg")' ]
    
    function slideimage(){
    counter = counter + 1
    var forslide =  angular.element($document[0].getElementsByClassName('acontainer'))
    forslide.css('background-image', images[counter] )
      if (counter === images.length){
          clearInterval(counter);
      }
    };
    $interval(slideimage, 3000)
  });
   // ******** slideshows ends here


});
