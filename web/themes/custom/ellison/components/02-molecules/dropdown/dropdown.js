Drupal.behaviors.dropdown = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('enableDropdown', '.dropdown', context).forEach(
      
      function (element) {

        function toggleDropdown(event,uuid) {

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
        toggleButtonEl.addEventListener('click', (event) => {
          toggleDropdown(event, uuid); 
        });

      }
      
    );

    once('sortDropdown', '.series-list .dropdown__menu--list', context).forEach(
      
      function (element) {

        function sortAlphaNumeric(a, b) {
          // Extract numeric parts
          const aNum = parseInt(a.innerText.match(/\d+/)[0]);
          const bNum = parseInt(b.innerText.match(/\d+/)[0]);
        
          // Compare numerically first
          if (aNum < bNum) {
            return -1;
          } else if (aNum > bNum) {
            return 1;
          } else {
            // If numerically equal, compare alphabetically
            if (a.innerText.toLowerCase() < b.innerText.toLowerCase()) {
              return -1;
            } else {
              return 1;
            }
          }
        
        }

        const listItems = Array.from(element.getElementsByTagName("LI"));
        listItems.sort(sortAlphaNumeric);
        listItems.forEach(item => element.appendChild(item));
        
      }
      
    );

  }
};