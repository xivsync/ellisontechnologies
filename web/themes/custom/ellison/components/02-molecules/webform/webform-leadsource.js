Drupal.behaviors.top = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleLeadsource', 'input[name=leadsource', context).forEach(
      
      function (element) {

        // https://www.ellisontechnologies.com/products/vertical-machining-centers?creative=&keyword=&matchtype=&network=x&device=c&gad_source=1&gclid=Cj0KCQjwurS3BhCGARIsADdUH51JPoaJwqyJ673H6WMteXNJdI13ItM6eiXCkx18sL-hkagZaJq2tjAaAlqoEALw_wcB

        let gclidDrupalSetting = drupalSettings.ellison.gclid || null;
        console.log('gclidDrupalSetting',gclidDrupalSetting);
        if (gclidDrupalSetting) {
          element.value = 'Google Ads';
        }
      }
      
    );

  }
};
