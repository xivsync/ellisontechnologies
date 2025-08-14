(function () {
  // Helper: get cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }

  // Extract region from ellison_region cookie
  let region = '';
  try {
    const cookieValue = getCookie('ellison_region');
    if (cookieValue) {
      const parsed = JSON.parse(cookieValue);
      region = parsed.region || '';
    }
  } catch (e) {
    console.warn('Could not parse ellison_region cookie:', e);
  }

  // Helper to get query string value
  function getParam(name) {
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Fields you want to track
  const fields = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'source_page_url',
    'gclid',
    'referrer'
  ];

  const SESSION_FLAG = 'utm_session_started';

  // If first page load this session, clear stored UTM fields
  if (!sessionStorage.getItem(SESSION_FLAG)) {
    fields.forEach(function (field) {
      localStorage.removeItem(field);
    });
    sessionStorage.setItem(SESSION_FLAG, '1');
  }

  // Store UTM/referrer values if not already stored
  fields.forEach(function (field) {
    if (!localStorage.getItem(field)) {
      let value = '';
      if (field === 'source_page_url') {
        value = window.location.href;
      } else if (field === 'referrer') {
        value = document.referrer;
      } else {
        value = getParam(field);
      }
      if (value) {
        localStorage.setItem(field, value);
        sessionStorage.setItem(field, value);
      }
    }
  });

  // Populate form fields with stored values
  function populateFields(context) {
    fields.forEach(function (field) {
      const el = (context || document).querySelector('[name="' + field + '"]');
      const stored = localStorage.getItem(field);
      if (el && stored) {
        el.value = stored;
      }
    });

    const utmSource = localStorage.getItem('utm_source');
    const leadsourceEl = (context || document).querySelector('input[name="leadsource"]');
    if (leadsourceEl && utmSource) {
      leadsourceEl.value = utmSource;
    }

    const gclid = localStorage.getItem('gclid');
    if (leadsourceEl && gclid) {
      leadsourceEl.value = 'Google Ads';
    }

    // ✅ Fill region__c from cookie value
    const regionEl = (context || document).querySelector('input[name="region__c"]');
    if (regionEl && region) {
      regionEl.value = region;
    }
  }

  window.addEventListener('load', function () {
    populateFields(document);
  });

  document.addEventListener('dialogContent', function (e) {
    populateFields(e.target);
  });
})();
