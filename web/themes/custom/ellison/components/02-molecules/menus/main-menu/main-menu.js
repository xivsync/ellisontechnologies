Drupal.behaviors.mainMenu = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('handleMainMenu', 'div#main-menu', context).forEach(

      function (element) {

        function collapse(item,link,expandedClass) {
          item.classList.remove(expandedClass);
          link.setAttribute('aria-expanded', false);
        }

        function expand(item,link,expandedClass) {
          item.classList.add(expandedClass);
          link.setAttribute('aria-expanded', true);
        }

        collapseItems = function(items,expandedClass) {
          for (item of items) {
            const link = item.getElementsByClassName('main-menu__link--sub-1')[0];
            collapse(item,link,expandedClass);
          }
        }

        function toggleSubmenu(e) {

          const link = e.target;
          const item = e.target.parentElement;
          const isExpanded = link.getAttribute('aria-expanded');
          const isSubmenu = link.classList.contains('main-menu__link--sub-1') ? true : false;
          const expandedClass = isSubmenu ? 'expanded-2' : 'expanded-1';
    
          if (isSubmenu) {

            console.log('isSubmenu');
            if (isExpanded === 'true') {
              collapse(item,link,expandedClass);
            } else {
              expand(item,link,expandedClass);
            }

          } else {

            if (isExpanded === 'true') {
              collapse(item,link,expandedClass);
            } else {
              const topLevelItems = document.getElementsByClassName('expanded-1');
              collapseItems(topLevelItems,'expanded-1');
              expand(item,link,expandedClass);
            }

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
