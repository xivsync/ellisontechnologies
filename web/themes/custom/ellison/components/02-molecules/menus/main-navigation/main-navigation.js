Drupal.behaviors.mainNavigation = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleMainNavigation', '#main-navigation', context).forEach(

      function (element) {

        function removeClasses(items,className){
          items.forEach((item) => {
            item.classList.remove(className);
          });

        }

        const menu = element.querySelector('ul.menu');

        if (menu) {

          const exandableToggles = element.querySelectorAll('li.has-expandable-menu a');
          exandableToggles.forEach((exandableToggle) => {

            console.log('exandableToggle',exandableToggle);
            exandableToggle.addEventListener('click', (event) => {
              // remove all expanded classes
              removeClasses(exandableToggles,'expanded');

              // add expanded class to clicked

              event.target.classList.add("expanded");
              event.preventDefault();

            });


          });

        }

      }

      
    );

    // Enable mobile
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
