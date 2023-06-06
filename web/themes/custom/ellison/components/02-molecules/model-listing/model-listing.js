Drupal.behaviors.modelListing = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('filterByRegion', '.model-listing', context).forEach(
      
      // found a model listing component
      function (element) {

        // get user region from cookie
        const userRegion = 'Wisconsin';

        // get collections group 1 by brand
        const collectionsEls = element.getElementsByClassName("collections");
        let allRegionsList = [];
        for (collectionsEl of collectionsEls) {

          // get regions for this collection
          const regionEls = collectionsEl.getElementsByClassName("region");
          
          // add comma delimited list of regions for brand to collection
          let brandRegions = regionEls[0].dataset.regions;
          collectionsEl.dataset.brandRegions = brandRegions ? brandRegions : 'none';
          collectionsEl.classList.add(brandRegions ? 'check-regions' : 'check-no-regions');

          // split comma delimited list of regions into array
          let brandRegionsList = brandRegions.split(',');
          allRegionsList = allRegionsList.concat(brandRegionsList);

          // set classlist for collection
          let uniqueBrandRegions = [...new Set(brandRegionsList)];
          uniqueBrandRegions.forEach(function (name) {
            
            collectionsEl.classList.add(
              'region-' + name.replace(' - ','').replace(' ','').toLowerCase()
            );
          });

        }

        // create an array of unique regions
        let uniqueRegionsList = [...new Set(allRegionsList)];

        // add unique regions to drupalSettings
        let ellisonUser = {
          brand_regions: uniqueRegionsList,
          user_region: userRegion,
        }

        //drupalSettings.ellisonUser = ellisonUser;
        
      }
      
    );

  }
};
