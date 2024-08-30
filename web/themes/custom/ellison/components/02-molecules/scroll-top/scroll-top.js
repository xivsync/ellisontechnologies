(function ($, Drupal) {
    Drupal.behaviors.scrollTop = {
      attach: function (context, settings) {
        once('scrollTop', 'body', context).forEach(function (element) {
  
          $(window).on('load', function () {
            $('body').append('<div id="topScroll"><button class="button" type="submit"><img src="/themes/custom/ellison/images/icons/gototop.png"></div>');
            $('#topScroll').click(function () {
              $("html, body").animate({ scrollTop: 0 }, 1000);
            });
            $('#topScroll').hide();
          });
  
          // Conditions for hiding and showing button
          $(window).scroll(function () {
            if ($(window).scrollTop() < 200) {
              $('#topScroll').hide(600);
            } else if ($(window).scrollTop() > 200 && $('#topScroll')[0]) {
              $('#topScroll').show(600);
            }
          });

        });
      }
    };
  })(jQuery, Drupal);