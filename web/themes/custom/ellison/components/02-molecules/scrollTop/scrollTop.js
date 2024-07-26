(function ($, Drupal) {
Drupal.behaviors.scrolltop = {
    attach: function(context, settings) {
        once('scrolltop', 'body', context).forEach(function(element) {
            console.log('loaded');
            $(window).on('load',function() {
                // if("#topScroll") {
                //     $("#topScroll").remove();
                //     console.log('Removed');
                // }
                $('body').append('<div id="topScroll" style="position: fixed; z-index: 999; right:5vw; bottom:10vh;"><button class="button" type="submit" style="border: none; border-radius: 25%; background:none; margin-right: 25px; margin-bottom: 25px; cursor: pointer;"><img style="margin-right: 55px; bottom: 55px;"; src="themes/custom/ellison/images/icon/gototop.png"></div>');
                // if('#topScroll') {
                //     console.log("Button Added");
                // }
                $('.button').click(function() {
                    $("html, body").animate({scrollTop: 0},1000);
                    console.log("Button Pressed");
                });
                $('#topScroll').hide();
            })
            // Conditions for hiding and showing button
            $(window).scroll(function() {
            if($(window).scrollTop() < 200){
                $('#topScroll').hide(600);
                // console.log("Button Hidden");
            }
            else if($(window).scrollTop()>200 && $('#topScroll')[0]) {
                $('#topScroll').show(600);
                // console.log("Button Shown")
        }});
        })
    }
}; }) (jQuery, Drupal);