Drupal.behaviors.handleWebform = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).

    once('handleRegionFormInputs', '.webform-submission-form', context).forEach(
      function (element) {
        const inputs = element.elements;
        if (Object.hasOwn(drupalSettings, "ellison") && Object.hasOwn(inputs,'region__c') ) {
          // Handles setting region correctly in Saleforce
          const session_sf_region_id = drupalSettings.ellison.session_sf_region_id;
          inputs['region__c'].value = session_sf_region_id;
        }

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

    once('handleNewsLetterForm', '#group__newsletter a.button-white', context).forEach(

      // found webform component
      function (element) {

        function formWork(element) {

          const buttonEl = element;

          buttonEl.addEventListener('click', (e) => {
            const newsletterToggleEl = document.querySelector('#group__newsletter .webform-submission-newsletter-form-form');
            newsletterToggleEl.style.setProperty('display', 'grid', 'important');
            buttonEl.style.display = 'none';
            e.preventDefault();
          });

        }

        // check if webform is added by bigpipe
        const checkReadyState = setInterval(() => {
          if (document.readyState === "complete") {
            clearInterval(checkReadyState);
            formWork(element);
          }
        }, 100);

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
          let emp = empInput.value;

          // copy emp to output
          empOutput.value = USDollar.format(emp);

          // calculate deduction
          let deduction = calculateDeduction(emp);
          deductionInput.value = USDollar.format(deduction); // Math.round(deduction)

          // calculate balance
          let balance = emp - deduction;
          balanceInput.value = USDollar.format(balance);

          // calculate bonus depreciation
          let bonusDepreciation = balance * 0.6;
          bonusInput.value = USDollar.format(bonusDepreciation);

          // calculate standard depreciation
          let standardDepreciation = (balance - bonusDepreciation) * 0.1429;
          standardInput.value = USDollar.format(standardDepreciation);

          // calculate first year tax deduction
          let first = Math.round(deduction + bonusDepreciation + standardDepreciation);
          firstInput.value = USDollar.format(first);

          // calculate tax savings based on assumed tax bracket
          bracket = bracketInput.value/100;
          let savings = first * bracket;
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
