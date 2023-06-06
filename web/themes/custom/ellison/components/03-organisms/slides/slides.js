Drupal.behaviors.slider = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('glide', '.glide', context).forEach(
      
      // found a model listing component
      function (element) {

        window.addEventListener('load', function () {

          let glide = new Glide(element, {
            type: 'carousel',
            focusAt: 'center',
            perView: 1,
          });

          glide.mount();

        })

        

      }

    );

  }
};