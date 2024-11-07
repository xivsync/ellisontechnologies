Drupal.behaviors.blocks = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleExposedForm', '.view--locations .views-exposed-form', context).forEach(
      
      function (element) {

        let region = '';
        let regionId = '';

        // tell user what region was selected which matches the region value in the footer
        if (Cookies.get('ellison_region')) {
          let ellison_region = JSON.parse(Cookies.get("ellison_region"));
          region = ellison_region.region || '';
          regionId = ellison_region.region_id || '';
          const label = element.querySelector('.form-item__label');
          if (label) {
            label.innerHTML = `Your preferred location is <strong>${region}</strong>. <em>Select a different location for nearby offices</em>.`;
          }
        }

        // filter locations by region id
        window.addEventListener('load',() => {
          const submit = element.querySelector('.form-submit');
          const formElments = element.elements;
          if (
            formElments.hasOwnProperty('region_id')
            && regionId !== ''
          ) {
            if (formElments.region_id.value!==regionId) {
              formElments.region_id.value = regionId;
              submit.click();
            }
          }

        });

      }

    );

  }
};
