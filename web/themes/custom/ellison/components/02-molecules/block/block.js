Drupal.behaviors.blocks = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleExposedForm', '.views-exposed-form', context).forEach(
      
      function (element) {

        // tell user what region was selected which matches the region value in the footer
        const sessionRegion = drupalSettings.ellison.session_region;
        //const currentLocation = document.getElementById('locations-current');
        const label = element.querySelector('.form-item__label');
        if (label) {
          label.innerHTML = `Your preferred location is <strong>${sessionRegion}</strong>. <em>Select a different location for nearby offices</em>.`;
        }

        

        window.addEventListener('load',() => {

          const submit = element.querySelector('.form-submit');
          const formElments = element.elements;

          if (
            formElments.hasOwnProperty('region_id')
            && drupalSettings.hasOwnProperty('ellison')
          ) {
            const sessionRegionId = drupalSettings.ellison.session_region_id;
            if (formElments.region_id.value!==sessionRegionId) {
              formElments.region_id.value = sessionRegionId;
              submit.click();
            }
          }

        });

      }

    );

  }
};
