(function () {
  // Helper to get query string value
  function getParam(name) {
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Fields you want to track
  var fields = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'source_page_url',
    'gclid'
    'referrer'
  ];

  // Unique key to detect if this is a fresh browser session
  var SESSION_FLAG = 'utm_session_started';

  // If session flag not set, treat as new browser session and clear stored UTM fields
  if (!sessionStorage.getItem(SESSION_FLAG)) {
    fields.forEach(function (field) {
      localStorage.removeItem(field);
    });
    sessionStorage.setItem(SESSION_FLAG, '1');
  }

  // Set values only if not already stored
  fields.forEach(function (field) {
    if (!localStorage.getItem(field)) {
      var value = '';
      if (field === 'source_page_url') {
        value = window.location.href;
      } else if (field === 'referrer') {
        value = document.referrer;
      } else {
        value = getParam(field);
      }

      if (value) {
        localStorage.setItem(field, value);
        sessionStorage.setItem(field, value); // optional: for quick access during same tab session
      }
    }
  });

  // Helper to populate fields in a given context (document or modal)
  function populateFields(context) {
    fields.forEach(function (field) {
      var el = (context || document).querySelector('[name="' + field + '"]');
      var stored = localStorage.getItem(field);
      if (el && stored) {
        el.value = stored;
      }
    });

    // Also fill input[name=leadsource] with utm_source if present
    var utmSource = localStorage.getItem('utm_source');
    var leadsourceEl = (context || document).querySelector('input[name="leadsource"]');
    if (leadsourceEl && utmSource) {
      leadsourceEl.value = utmSource;
    }
  }

  // On normal page load
  window.addEventListener('load', function () {
    populateFields(document);
  });

  // On Drupal dialog load (for modals)
  document.addEventListener('dialogContent', function (e) {
    populateFields(e.target);
  });
})();
// End of UTM tracking script
// This script tracks UTM parameters and referrer information, storing them in localStorage.
// It also populates form fields with these values when the page loads or when a dialog is opened.
// The session flag ensures that UTM fields are cleared only once per browser session.
// It is designed to work with Drupal's dialog system and can be used in various contexts.
// The script is self-contained and does not rely on any external libraries.