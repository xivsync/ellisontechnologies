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
        } else if(!Cookies.get('visited') && !Cookies.get('ellison_region')) {
            const promoModal = document.createElement('div');
            promoModal.className = 'promo-modal-overlay';
            promoModal.innerHTML = '<div class="promo-modal"><button class="close-btn">✕</button><div class="promo-content" data-sitewide-alert></div<div>';
            document.body.appendChild(promoModal);
            // Open and Close Script
            document.addEventListener('DOMContentLoaded', () => {
              const modalOverlay = document.querySelector('.promo-modal-overlay');
              const closeButton = document.querySelector('.close-btn');
              // Open modal
              modalOverlay.classList.add('show');
   
   
              // Close modal when button clicked
              closeButton.addEventListener('click', () => {
                modalOverlay.classList.remove('show');
                Cookies.set('visited');
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
                //closeEl.click();
                setTimeout(function() {
                  window.location.reload(); // Or window.location.reload(true) for force reload
                }, 2000); // 2000 milliseconds = 2 seconds
              });
            });
 
 
          });
              });
            }); 
        }  else if(Cookies.get('visited') && !Cookies.get('ellison_region')) {
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
                //closeEl.click();
                setTimeout(function() {
                  window.location.reload(); // Or window.location.reload(true) for force reload
                }, 2000); // 2000 milliseconds = 2 seconds
              });
            });
 
 
          });
        };
       
      }
  
     
    );
 
 
  }
  };
 