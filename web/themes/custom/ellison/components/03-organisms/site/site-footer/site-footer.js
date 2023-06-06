Drupal.behaviors.siteFooter = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('location', '.footer__local', context).forEach(
      
      function (element) {

        // get session region from drupal settings
        const region = drupalSettings.ellison.session_region;
        // open select location webform if no session_region is set
        if (region==='default') {
          element.getElementsByTagName('a')[0].click();
        }
        
      }
      
    );

  }
  
};
