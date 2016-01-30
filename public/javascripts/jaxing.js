// console.log("jaxing.js")


$(document).ready(function() { 

	$('.imageform').on('submit', function(){
    var form = $(this);
    var url = form.attr('action');
    var method = form.attr('method');
    var data={}

    form.find('[name]').each(function(index, value){
	    var inputbox = $(this);
	    var name = inputbox.attr('name');
	    var value = inputbox.val();
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
					//bookmark-come back later
				})
				.fail(function() {
				})
				.always(function() {
				});	
		})
		.fail(function() {
		})
		.always(function() {
		});
		 return false; 
	})

		 $(this).ajaxStop(function(){ window.location.reload(); });

	$('.deleteme').on('click', function(){ 
   alert("Are you sure?")
	})

})






