// console.log("this is scrolle me loaded")

  var scrolldelay;

  function pagescroll() {
	  window.scrollBy(0,50); 
	  scrolldelay = setTimeout('pagescroll()',30); 
	}

	var selectedbutton = document.querySelector("#clicktoslide");
	selectedbutton.addEventListener('click', function(event) {
	  pagescroll() 
	})

	window.addEventListener("scroll", function(event) {
		if (this.scrollY > 290.6){
			clearTimeout(scrolldelay);
		}
	})