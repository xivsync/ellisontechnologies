Drupal.behaviors.siteFooter = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('location', '.footer__local', context).forEach(
      
      function (element) {

        const locationLinkEl = element.getElementsByTagName('a')[0];

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

        function handleForm(footerLocalEl) {
          
          waitForElement('.webform-submission-select-your-location-form', (footerLocalEl) => {

            const formEl = footerLocalEl;
            const radioButtonEls = formEl.querySelectorAll('input[type="radio"]');
            const submitEl = formEl.querySelector('input[type="submit"]');
            const titlePaneEl = document.querySelector('.ui-dialog-titlebar');
            const buttonPaneEl = document.querySelector('.ui-dialog-buttonpane');
            const contentPaneEl = document.querySelector('.ui-dialog-content');
            
            // handle modal restyling
            titlePaneEl.hidden = true;
            buttonPaneEl.hidden = true;
            contentPaneEl.style.paddingTop = '2rem';
            contentPaneEl.style.paddingBottom = '2rem';

            radioButtonEls.forEach(radioButtonEl => {
              radioButtonEl.addEventListener('click', (event) => {
                submitEl.click();
                setTimeout(function() {
                  window.location.reload(); // Or window.location.reload(true) for force reload
                }, 2000); // 2000 milliseconds = 2 seconds
              });
            });

          });
          
        }

        // check for region cookie and open modal or add user location to footer
        if (Cookies.get('ellison_region')) {
          const ellison_region = JSON.parse(Cookies.get("ellison_region"));
          const region = ellison_region.region || '';
          const locationEl = document.getElementById("user-location");
          locationEl.innerText = region;
        } else {
          locationLinkEl.click();
          handleForm(element);
        }

        locationLinkEl.addEventListener("click", function() {
          handleForm(element);
        });
        
      }
      
    );

  }
  
};
