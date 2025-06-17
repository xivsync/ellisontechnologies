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

  // When the form loads, populate the hidden fields
  window.addEventListener('load', function() {
    fields.forEach(function(field) {
      var el = document.querySelector('[name="' + field + '"]');
      if (el && localStorage.getItem(field)) {
        el.value = localStorage.getItem(field);
      }
    });
  });
})();