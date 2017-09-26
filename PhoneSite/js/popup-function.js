   ;(function($) {

         // DOM Ready
        $(function() {

            // Binding a click event
            // From jQuery v.1.7.0 use .on() instead of .bind()
            $('#buy-now').bind('click', function(e) {

                // Prevents the default action to be triggered. 
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('.popup-1').bPopup({
            speed: 650,
            transition: 'slideIn',
	    transitionClose: 'slideBack',
        closeClass:'pay-now'
        /*closeClass:'popup-1'*/
        });

            });


  $('.pay-now').bind('click', function(e) {

                // Prevents the default action to be triggered. 
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('.popup-2').bPopup({

            speed: 650,
            transition: 'slideIn',
        transitionClose: 'slideBack',
        closeClass:'bClose',
        closeClass:'login'

        
        });

            });



  $('.login').bind('click', function(e) {

                // Prevents the default action to be triggered. 
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('.popup-3').bPopup({

            speed: 650,
            transition: 'slideIn',
        transitionClose: 'slideBack',
        closeClass:'bClose'

        
        });

            });




        });





    })(jQuery);