console.log("jax")

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
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

	   console.log(data)
		 return false; 
		})
		$(this).ajaxStop(function(){ window.location.reload(); });
	})


