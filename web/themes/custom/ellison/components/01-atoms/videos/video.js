Drupal.behaviors.responsiveEmbeddedVideos = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).

    function makeResponsive(element) {
      const width = element.getAttribute('width');
      const height = element.getAttribute('height');
      const aspectRatio = `${width} / ${height}`;
      const parentDiv = element.parentNode;
      parentDiv.style.aspectRatio = aspectRatio;
      // Clear static height/width attributes for responsive styles
      element.setAttribute('height','100%');
      element.setAttribute('width','100%');
    }
  
    once('enableResponsiveEmbeddedVimeo', 'iframe[src*="vimeo.com"]', context).forEach(
      function (element) {
        makeResponsive(element);
      }
    );

    once('enableResponsiveEmbeddedYouTube', 'iframe[src*="youtu.be"]', context).forEach(
      function (element) {
        makeResponsive(element);
      }
    );

  }
};