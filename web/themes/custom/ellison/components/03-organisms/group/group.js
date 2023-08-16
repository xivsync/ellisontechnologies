Drupal.behaviors.onPageNavigation = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('buildOnPageNav', '.field-on-page-navigation', context).forEach(
      
      function (element) {

        const enabled = element.innerHTML === 'Enabled' ? true : false;
        if (enabled) {

          // add contact us button first
          element.innerHTML = `<a href="/form/contact" class="webform-dialog webform-dialog-normal button">Contact Us</a>`;

          const groupEls = document.getElementsByClassName('group');
          for (groupEl of groupEls) {

            const label = groupEl.dataset.idLabel;
            const anchor = groupEl.id;

            // Exclude the N/A and Newsletter groups from the on-page navigation.
            if (label !== 'na' && label !== 'newsletter') {

              let aEl = document.createElement('a');
              const aText = document.createTextNode(label);
              aEl.appendChild(aText);
              aEl.title = label;
              aEl.href = '#' + anchor;

              element.innerHTML += `<a class="button" href="#${anchor}">${label}</a>`;

            }
          
          }

        }
        
      }
      
    );

  }
};
