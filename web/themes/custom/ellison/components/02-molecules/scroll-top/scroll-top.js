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
    //scroll-hash
    $(document).ready(function(){
      $('.scroll-hash a').click(function() {
        var targetHash = $(this).attr('href');
        var hashname = targetHash.split('#')[1];
        var targetScrollTo = 0;
        var fixedTop = 70;

        if ($('#'+hashname).length > 0 ) {
          if ($( window ).width() > 991) {
            fixedTop += $('header.header').height();
            if ($('.sitewide-alert').length > 0) {
              fixedTop += $('.sitewide-alert').height();
            }
            if ($('#toolbar-bar').length > 0) {
              if ($('.toolbar-tray-horizontal').hasClass('is-active')) {
                fixedTop += $('.toolbar-tray-horizontal').height();
              }
              fixedTop = fixedTop + $('#toolbar-bar').height();
            }
          }
          targetScrollTo = $('#'+hashname).offset().top - 500;
          $("html, body").animate({
            scrollTop: targetScrollTo
          }, 1000);
        }
        return false;
      });
    });
  })(jQuery, Drupal);
