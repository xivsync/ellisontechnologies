(function () {
  // Helper: get cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }

  // Grab values from URL-encoded ellison_region cookie
  let cookieRegion = '';
  let cookieSfRegionId = '';
  try {
    const raw = getCookie('ellison_region');
    if (raw) {
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded);
      cookieRegion = parsed.region || '';
      cookieSfRegionId = parsed.sf_region_id || '';
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

  // Populate form fields with stored values + cookie mappings
  function populateFields(context) {
    const root = context || document;

    // UTM/referrer fields
    fields.forEach(function (field) {
      const el = root.querySelector('[name="' + field + '"]');
      const stored = localStorage.getItem(field);
      if (el && stored) el.value = stored;
    });

    // Lead source
    const utmSource = localStorage.getItem('utm_source');
    const leadsourceEl = root.querySelector('input[name="leadsource"]');
    if (leadsourceEl && utmSource) leadsourceEl.value = utmSource;

    const gclid = localStorage.getItem('gclid');
    if (leadsourceEl && gclid) leadsourceEl.value = 'Google Ads';

    // ✅ Map cookie -> fields
    // region__c should get sf_region_id
    const regionIdEl = root.querySelector('input[name="region__c"]');
    if (regionIdEl && cookieSfRegionId) regionIdEl.value = cookieSfRegionId;

    // location field should get region (human-readable)
    // Try a few common name variants just in case
    const locationEl =
      root.querySelector('input[name="location"]') ||
      root.querySelector('input[name="Location"]') ||
      root.querySelector('input[name="location__c"]');
    if (locationEl && cookieRegion) locationEl.value = cookieRegion;
  }

  window.addEventListener('load', function () {
    populateFields(document);
  });

  // For Drupal dialogs/modals
  document.addEventListener('dialogContent', function (e) {
    populateFields(e.target);
  });
})();
