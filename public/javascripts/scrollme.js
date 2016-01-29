console.log("this is scrolle me loaded")

  var scrolldelay;

  function pagescroll() {
	  window.scrollBy(0,50); 
	  scrolldelay = setTimeout('pagescroll()',30); 
	}

	var selectedbutton = document.querySelector("#clicktoslide");
	selectedbutton.addEventListener('click', function(event) {
		console.log("just got clicked")
	  pagescroll() 
	})

	window.addEventListener("scroll", function(event) {
		console.log(this.scrollY)
		if (this.scrollY > 290.6){
			clearTimeout(scrolldelay);
		}
	})