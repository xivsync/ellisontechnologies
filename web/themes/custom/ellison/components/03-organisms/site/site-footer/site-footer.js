Drupal.behaviors.siteFooter = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('location', '.footer__local', context).forEach(
      
      function (element) {

        function checkCookie(cookieName) {
          let cookieValue = getCookie(cookieName);
          if (cookieValue != "") {
            return true;
          } else {
            return false;
          }
        }
        
        function getCookie(cookieName) {
          let name = cookieName + "=";
          let decodedCookie = decodeURIComponent(document.cookie);
          let ca = decodedCookie.split(';');
          for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }

        // popup modal if cookie does not exist
        if (!checkCookie("ellison_region")) {
          element.getElementsByTagName('a')[0].click();
        }
        
      }
      
    );

  }
  
};
