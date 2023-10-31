Drupal.behaviors.mainNavigation = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleMobi', '.header__mobi', context).forEach(
      
      function (element) {

        function toggleMobi(e){

          const buttonEl = e.target;
          const toggleTarget = e.target.getAttribute('data-toggle-target');
          const toggleTargetEl = document.getElementsByClassName(toggleTarget)[0];
          const isExpanded = buttonEl.getAttribute('aria-expanded');
    
          if (isExpanded === 'true') {
            toggleTargetEl.classList.remove('expanded');
            buttonEl.setAttribute('aria-expanded', false);
          } else {
            toggleTargetEl.classList.add('expanded');
            buttonEl.setAttribute('aria-expanded', true);
          }
    
          e.preventDefault();
        }

        const buttonEls = element.getElementsByTagName('button');
        for (buttonEl of buttonEls) {
          buttonEl.addEventListener("click", toggleMobi);
        }

      }
    );

  }
};
