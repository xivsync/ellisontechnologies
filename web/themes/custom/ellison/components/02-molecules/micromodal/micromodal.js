Drupal.behaviors.micromodal = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('enableMicromodal', '#block-views-block-videos-block-1', context).forEach(
      
      function (element) {

        function getAnchor() {
          return (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : null;
        }
  
        const videoLinkClassName = getAnchor();
        const videoLinkEl = document.querySelector(`.${videoLinkClassName}`);
        if (videoLinkEl) {
          videoLinkEl.click();
        }

      }
      
    );

    once('copyVideoLink', '.micromodal-form', context).forEach(
      
      function (element) {

        

        function copyToClipboard(event) {

          console.log('event',event);
  
          // Get the text field
          var copyText = event.target[1];

          // Select the text field
          copyText.select();
          copyText.setSelectionRange(0, 99999); // For mobile devices
          

          let url = `${window.location.origin}${window.location.pathname}${window.location.search}#${copyText.value}`

          // Copy the text inside the text field
          navigator.clipboard.writeText(url);

          window.confirm("Copied the text: " + url);

          event.preventDefault();

        }
        
        const form = element;
        form.addEventListener("submit", copyToClipboard);

      }
      
    );

  }
};
