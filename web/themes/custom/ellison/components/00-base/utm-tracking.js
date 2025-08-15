(function () {
  // --- helpers ---
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }
  function normalizeRegionName(s) {
    return (s || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ') // collapse punctuation
      .trim();
  }

  // --- mapping: region name -> FIRST sublocation ID ---
  // (per your rule: choose the *first* location in the sublist)
  const REGION_TO_FIRST_ID = (function () {
    const map = new Map();
    map.set(normalizeRegionName('Indiana'), '340'); // (Indiana)
    map.set(normalizeRegionName('Ohio & Kentucky'), '355'); // Southern Ohio & Kentucky – 355
    map.set(normalizeRegionName('California & Nevada'), '218'); // Southern California – 218
    map.set(normalizeRegionName('Illinois'), '304'); // (Illinois)
    map.set(normalizeRegionName('Pacific Northwest'), '205'); // Washington – 205
    map.set(normalizeRegionName('South Atlantic'), '400'); // (Southeast - Charlotte)
    map.set(normalizeRegionName('South Central'), '450'); // (Southeast - Nashville)
    map.set(normalizeRegionName('Southwest'), '252'); // South Texas & South Louisiana – 252
    map.set(normalizeRegionName('Central'), '320'); // Iowa & Nebraska – 320
    map.set(normalizeRegionName('Wisconsin'), '307'); // (Wisconsin)
    map.set(normalizeRegionName('North Central'), '308'); // (Minnesota)
    return map;
  })();

  // --- read cookie (URL-encoded JSON) ---
  let cookieRegion = '';     // human name (e.g., "Pacific Northwest")
  try {
    const raw = getCookie('ellison_region');
    if (raw) {
      const parsed = JSON.parse(decodeURIComponent(raw));
      cookieRegion = parsed.region || '';
    }
  } catch (e) {
    console.warn('Could not parse ellison_region cookie:', e);
  }

  // --- existing UTM logic (unchanged) ---
  function getParam(name) {
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  const fields = ['utm_source','utm_medium','utm_campaign','source_page_url','gclid','referrer'];
  const SESSION_FLAG = 'utm_session_started';

  if (!sessionStorage.getItem(SESSION_FLAG)) {
    fields.forEach(f => localStorage.removeItem(f));
    sessionStorage.setItem(SESSION_FLAG, '1');
  }

  fields.forEach(function (field) {
    if (!localStorage.getItem(field)) {
      let value = '';
      if (field === 'source_page_url') value = window.location.href;
      else if (field === 'referrer') value = document.referrer;
      else value = getParam(field);
      if (value) {
        localStorage.setItem(field, value);
        sessionStorage.setItem(field, value);
      }
    }
  });

  // --- populate form ---
  function populateFields(context) {
    const root = context || document;

    // UTM/referrer
    fields.forEach(function (field) {
      const el = root.querySelector('[name="' + field + '"]');
      const stored = localStorage.getItem(field);
      if (el && stored) el.value = stored;
    });

    // leadsource + gclid override
    const leadsourceEl = root.querySelector('input[name="leadsource"]');
    const utmSource = localStorage.getItem('utm_source');
    if (leadsourceEl && utmSource) leadsourceEl.value = utmSource;
    const gclid = localStorage.getItem('gclid');
    if (leadsourceEl && gclid) leadsourceEl.value = 'Google Ads';

    // location (human-readable region name from cookie)
    const locationEl =
      root.querySelector('input[name="location"]') ||
      root.querySelector('input[name="Location"]') ||
      root.querySelector('input[name="location__c"]');
    if (locationEl && cookieRegion) locationEl.value = cookieRegion;

    // region__c (first sublocation ID based on region name)
    const regionIdEl = root.querySelector('input[name="region__c"]');
    if (regionIdEl && cookieRegion) {
      const key = normalizeRegionName(cookieRegion);
      const firstId = REGION_TO_FIRST_ID.get(key) || '';
      if (firstId) {
        regionIdEl.value = firstId;
      } else {
        console.warn('No mapping for region (using first sublocation ID):', cookieRegion);
      }
    }
  }

  window.addEventListener('load', function () {
    populateFields(document);
  });
  document.addEventListener('dialogContent', function (e) {
    populateFields(e.target);
  });
})();
