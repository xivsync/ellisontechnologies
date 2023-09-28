Drupal.behaviors.glidejs = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('implementGlideJs', '.slider-on', context).forEach(
      
      function (element) {

        window.addEventListener('load', function () {

          console.log('slider-on',element);

          const slider = element.querySelector('.glide');
          const visibleItems = element.dataset.visibleItems;

          let glide = new Glide(slider, {
            type: 'carousel',
            focusAt: 'center',
            perView: visibleItems,
            autoplay: true,
            hoverpause: true,
            breakpoints: {
              1024: {
                perView: 2
              },
              768: {
                perView: 1
              }
            }
          });

          glide.mount();

        });
        
      }
      
    );

  }
};
