Drupal.behaviors.dropdown = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('enableDropdown', '.dropdown', context).forEach(
      
      function (element) {

        function toggleDropdown(e) {

          const toggleButtonEl = e.target;
          const uuid = toggleButtonEl.dataset.dropdownUniqueId;
          
          const componentEl = document.getElementById(`dropdown-${uuid}`);
          const state = componentEl.dataset.dropdownState;

          // toggle based on state
          toggleButtonEl.setAttribute('aria-expanded', state==='expanded' ? false : true);

          componentEl.dataset.dropdownState = (state==='expanded' ? 'collapsed' : 'expanded');
          componentEl.classList.remove(state==='expanded' ? 'state-is-expanded' : 'state-is-collapsed');
          componentEl.classList.add(state==='expanded' ? 'state-is-collapsed' : 'state-is-expanded');
          
        }

        const uuid = element.dataset.dropdownUniqueId;
        const toggleButtonEl = document.getElementById(`toggle-${uuid}`);
        toggleButtonEl.addEventListener('click', toggleDropdown);
        
      }
      
    );

    once('sortDropdown', '.series-list .dropdown__menu--list', context).forEach(
      
      function (element) {

        console.log(element);
        var list, i, switching, b, shouldSwitch;
        list = element;

        switching = true;
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
          // start by saying: no switching is done:
          switching = false;
          b = list.getElementsByTagName("LI");
          // Loop through all list-items:
          for (i = 0; i < (b.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should
            switch place with the current item: */
            if (b[i].innerText.toLowerCase() > b[i + 1].innerText.toLowerCase()) {
              /* if next item is alphabetically
              lower than current item, mark as a switch
              and break the loop: */
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark the switch as done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
          }
        }
        
      }
      
    );

  }
};