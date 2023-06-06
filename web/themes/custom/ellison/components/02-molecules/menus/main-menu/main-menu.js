Drupal.behaviors.mainMenu = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleMainMenu', 'div#main-menu', context).forEach(

      function (element) {

        function toggleSubmenu(e) {

          const link = e.target;
          const item = e.target.parentElement;
          const isExpanded = link.getAttribute('aria-expanded');
          const expandedClass = link.classList.contains('main-menu__link--sub-1') ? 'expanded-2' : 'expanded-1';
    
          if (isExpanded === 'true') {
            item.classList.remove(expandedClass);
            link.setAttribute('aria-expanded', false);
          } else {
            item.classList.add(expandedClass);
            link.setAttribute('aria-expanded', true);
          }
    
          e.preventDefault();
    
        }

        // Enable main menu toggles
        const menuLinksWithSub = element.getElementsByClassName('main-menu__link--with-sub');
        for (menuLinkWithSub of menuLinksWithSub) {
          let menuItemWithSub = menuLinkWithSub.parentElement;
          menuLinkWithSub.setAttribute('aria-expanded', false)
          menuLinkWithSub.addEventListener("click", toggleSubmenu);
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
