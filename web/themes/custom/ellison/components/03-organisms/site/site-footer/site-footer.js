Drupal.behaviors.siteFooter = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('location', '.footer__local', context).forEach(
      
      function (element) {

        function waitForElement(selector, callback) {
          const observer = new MutationObserver((mutations, observer) => {
              const element = document.querySelector(selector);
              if (element) {
                  observer.disconnect();
                  callback(element);
              }
          });
      
          observer.observe(document.body, {
              childList: true,
              subtree: true,
          });
        }

        // check for region cookie and open modal or add user location to footer
        if (Cookies.get('ellison_region')) {
          const ellison_region = JSON.parse(Cookies.get("ellison_region"));
          const region = ellison_region.region || '';
          const locationEl = document.getElementById("user-location");
          locationEl.innerText = region;
        } else {
          element.getElementsByTagName('a')[0].click();

          waitForElement('.webform-submission-select-your-location-form', (element) => {

            const formEl = element;
            const radioButtonEls = formEl.querySelectorAll('input[type="radio"]');
            const submitEl = formEl.querySelector('input[type="submit"]');
            const closeEl = document.querySelector('.ui-dialog-titlebar-close');
            const titlePaneEl = document.querySelector('.ui-dialog-titlebar');
            const buttonPaneEl = document.querySelector('.ui-dialog-buttonpane');
            const contentPaneEl = document.querySelector('.ui-dialog-content');
            

            titlePaneEl.hidden = true;
            buttonPaneEl.hidden = true;
            contentPaneEl.style.paddingTop = '2rem';
            contentPaneEl.style.paddingBottom = '2rem';

            radioButtonEls.forEach(radioButtonEl => {
              radioButtonEl.addEventListener('click', (event) => {
                submitEl.click();
                closeEl.click();
              });
            });

          });

        }
        
      }
      
    );

  }
  
};
