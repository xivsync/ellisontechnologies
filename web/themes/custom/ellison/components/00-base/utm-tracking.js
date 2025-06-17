(function() {
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
    'referrer'
  ];

  // Save UTM params and page info to localStorage
  fields.forEach(function(field) {
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
    }
  });

 // Helper to populate fields in a given context (document or modal)
  function populateFields(context) {
    fields.forEach(function(field) {
      var el = (context || document).querySelector('[name="' + field + '"]');
      if (el && localStorage.getItem(field)) {
        el.value = localStorage.getItem(field);
      }
    });
  }

  // On normal page load
  window.addEventListener('load', function() {
    populateFields(document);
  });

  // On Drupal dialog load (for modals)
  document.addEventListener('dialogContent', function(e) {
    populateFields(e.target);
  });
})();