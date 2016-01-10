console.log("jaxing.js")


$(document).ready(function() { 

	$('.imageform').on('submit', function(){
    var form = $(this);
    var url = form.attr('action');
    var method = form.attr('method');
    var data={}

    form.find('[name]').each(function(index, value){
	    // console.log(value)
	    var inputbox = $(this);
	    var name = inputbox.attr('name');
	    var value = inputbox.val();
	    // console.log(name)
	    // console.log(value)
	    data[name]=value
    })

	  $.ajax({
			url: url,
			type: method,
			dataType: 'JSON',
			data: data
		})
		.done(function(html) {
			console.log("success in posting");
				$.ajax({
					url: '/posts/doublejax',
					type: 'GET',
					dataType: 'JSON',
				})
				.done(function(response) {
					console.log("success in getting");
					console.log(response);
				})
				.fail(function() {
					console.log("error in getting");
				})
				.always(function() {
					console.log("completed getting");
				});	
		})
		.fail(function() {
			console.log("error in posting");
		})
		.always(function() {
			console.log("completed posting");
		});

	   console.log(data)
		 return false; 
	})
		$(this).ajaxStop(function(){ window.location.reload(); });

	$('.deleteme').on('click', function(){ 
   alert("Are you sure?")
	})

})






