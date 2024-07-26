(function ($, Drupal) {
Drupal.behaviors.scrollTop = {
    attach: function(context, settings) {
        once('scrollTop', 'body', context).forEach(function(element) {
            console.log('loaded');
            $(window).on('load',function() {
                // if("#topScroll") {
                //     $("#topScroll").remove();
                //     console.log('Removed');
                // }
                $('body').append('<div id="topScroll"><button class="button" type="submit"><img src="/themes/custom/ellison/images/icons/gototop.png"></div>');
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