Drupal.behaviors.handleWebform = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).

    once('handleWebform', '.webform-submission-form', context).forEach(
      function (element) {
        const inputs = element.elements;

        function convertIcsDate(value) {
          const numberValue = Number(value)*1000;
          const date = new Date(numberValue);
          const dateIso = date.toISOString();
          const dateIsoStripped = dateIso.replace(/[-:.]/g, '');
          return dateIsoStripped.slice(0,-4) + 'Z';
        }

        // Handles converting timestamp to ISO 8601 for dates used by ics file attached on the event form
        if (Object.hasOwn(inputs,'dtstamp')||Object.hasOwn(inputs,'dtstart')||Object.hasOwn(inputs,'dtend')) {
          inputs['dtstamp'].value = convertIcsDate(inputs['dtstart'].value);
          inputs['dtstart'].value = convertIcsDate(inputs['dtstart'].value);
          inputs['dtend'].value = convertIcsDate(inputs['dtend'].value);
        }

        // Handles converting timestamp to Salesforce date for Showdate1
        if (Object.hasOwn(inputs,'dates_and_times')) {
          const timestamp = Number(inputs['dates_and_times'].value);
          const date = new Date(timestamp * 1000); // JavaScript timestamps are in seconds
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
          const day = String(date.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          inputs['dates_and_times'].value = formattedDate;
        }
      }
    );

    once('handleTaxCalculationForm', '#group__tax-calculator-section-179', context).forEach(

      // found webform component
      function (element) {

        /*
         * element often does not have the tax form so we need to wait for BigPipe to add it
         * run when tax calculator form element is presetn
        */

        const observer = new MutationObserver((mutations, obs) => {
          const taxForm = document.querySelector('.webform-submission-tax-calculator-form');
          if (taxForm) {
            formWork(taxForm);
            obs.disconnect();
            return;
          }
        });

        observer.observe(document, {
          childList: true,
          subtree: true
        });

        // calculate deduction based on price
        function calculateDeduction(price) {

          if (price > 4269999) {
            return 0;
          } else if (price > 3050000) {
            return 1220000 - (price - 3050000);
          } else if (price < 1220000) {
            return price;
          } else {
            return 1220000; // Handle the case where G29 is exactly 1220000 (optional)
          }

        }

        let USDollar = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        });

        function updateCalculations(webformElements) {

          // get values from webform elements
          let empInput = webformElements['edit-estimated-machine-price'];
          let deductionInput = webformElements['edit-section-179-deduction'];
          let balanceInput = webformElements['edit-balance-depreciate-over-seven-years'];
          let bonusInput = webformElements['edit-80-bonus-depreciation'];
          let standardInput = webformElements['edit-standard-depreciation'];
          let firstInput = webformElements['edit-total-first-year-tax-deduction'];
          let bracketInput = webformElements['edit-assumed-customer-tax-bracket'];
          let savingsInput = webformElements['edit-tax-savings'];
          let paymentsInput = webformElements['edit-approximate-number-of-payments'];
          let empOutput = webformElements['edit-emp'];

          // get estimated machine price (emp)
          let emp = parseInt(empInput.value);

          // copy emp to output
          empOutput.value = USDollar.format(emp);

          // calculate deduction
          let deduction = calculateDeduction(emp);
          deductionInput.value = USDollar.format(deduction); // Math.round(deduction)

          // calculate balance
          let balance = emp - deduction;
          balanceInput.value = USDollar.format(balance);

          // calculate bonus depreciation
          let bonusDepreciation = balance * 0.4;
          bonusInput.value = USDollar.format(bonusDepreciation);

          // calculate standard depreciation
          let standardDepreciation = (balance - bonusDepreciation) * 0.1429;
          standardInput.value = USDollar.format(standardDepreciation);

          // calculate first year tax deduction
          let first = Math.round(deduction + bonusDepreciation + standardDepreciation);
          firstInput.value = USDollar.format(first);

          // calculate tax savings based on assumed tax bracket
          bracket = parseInt(bracketInput.value)/100;
          let savings = Math.round(first * bracket);
          savingsInput.value = USDollar.format(savings);

          // calculate payments
          let payments = savings/(emp * 0.02);
          paymentsInput.value = Math.round(payments);

        }

        // function to handle webforms
        function formWork(formEl) {

          // get webform element
          let webform = formEl;
          let webformClasses = webform.classList;
          const formNames = [...webformClasses];

          // if webform is tax calculator
          if (formNames.includes('webform-submission-tax-calculator-form')) {

            // get webform elements and values
            let webformElements = webform.elements;
            let empInput = webformElements['edit-estimated-machine-price'];
            let bracketInput = webformElements['edit-assumed-customer-tax-bracket'];
            let calculateButton = formEl.querySelector('.webform-button--submit');

            // set default values
            empInput.value = 1950000;
            bracketInput.value = 32;

            // initialize calculations
            updateCalculations(webformElements);

            calculateButton.addEventListener('click', (e) => {
              updateCalculations(webformElements);
              e.preventDefault();
            });
            
          }

        }

      },

    );

  }
};
// Change region value by location
(function ($, Drupal) {
  jQuery("body").on('change', 'select[name="location"], select[name="select_location"]', function(event) {
    let locationRID = '';
    let regionId = '';
    if (Cookies.get('ellison_region')) {
      let ellison_region = JSON.parse(Cookies.get("ellison_region"));
      //region = ellison_region.region || '';
      regionId = ellison_region.sf_region_id || '';
      let location = $(this).val();
      switch(location) {
        case "Southern Ohio and Kentucky":
          // code block
          locationRID = 355; //(Ohio - Cincinnati);
          break;
        case "Northern Ohio and Kentucky":
        case "Northern Ohio":
          // (Ohio - Cleveland)
          locationRID = 350;
          break;
        case "Southern California":
          // (Southern California)
          locationRID = 218;
          break;
        case "Washington":
        case "N. Idaho":
        case "Alaska":
          // (Northwest – Washington)
          locationRID = 205;
          break;
        case "Oregon":
          // (Northwest - Oregon)
          locationRID = 210;
          break;
        case "South Texas and South Louisiana":
          // (Texas – South)
          locationRID = 252;
          break;
        case "North Texas and North Louisiana":
          // (Texas – South) 253 (Texas – North)
          locationRID = 253;
          break;
        case "Iowa and Nebraska":
          // 320 (TriStates – Iowa/NE)
          locationRID = 320;
          break;
        case "Missouri & Southern Illinois":
          //325 (TriStates – MO)
          locationRID = 325;
          break;
        case "Northern California & Nevada":
          //219 (Northern California)
          locationRID = 219;
          break;
        default:
        // code block
          break;
      }
      if (locationRID !== "") {
        $('input[name="region__c"]').val(locationRID);
        $('input[name="webform_region_c"]').val(locationRID);
      }
      else {
        $('input[name="region__c"]').val(regionId);
        $('input[name="webform_region_c"]').val(regionId);
      }
    }
  });

  $("body").on('keypress', '.webform-submission-form', function(event) {
    $.urlParam = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.search);
      return (results !== null) ? results[1] || 0 : false;
    }

    let current_page_url = window.location.href;
    if ($.urlParam('utm_source')) {
      let utm_source = $.urlParam('utm_source');
      if (utm_source == 'social-media' ) {
        utm_source = 'Google Ads';
      }
      $('input[name="leadsource"]').val(utm_source);
    }
    
    if (drupalSettings.hasOwnProperty('ellison')) {
      let gclidDrupalSetting = drupalSettings.ellison.gclid || null;
      if (gclidDrupalSetting) {
        $('input[name="leadsource"]').val('Google Ads');
      }
    }
    $('input[name="source_page_url"]').val(current_page_url);
  });
})(jQuery, Drupal);


