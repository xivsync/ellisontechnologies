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

  }
};
