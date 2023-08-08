Drupal.behaviors.handleWebform = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).

    once('handleNewsLetterForm', '#group__newsletter h2 a', context).forEach(

      // found webform component
      function (element) {

        function formWork(element) {
          console.log("newsletter",element);

          const buttonEl = element;

          buttonEl.addEventListener('click', (e) => {
            const newsletterToggleEl = document.querySelector('#group__newsletter .webform-submission-newsletter-form-form');
            newsletterToggleEl.style.display = 'flex';
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


    once('handleTaxCalculationForm', '.webform-submission-tax-calculator-form', context).forEach(


      // found webform component
      function (element) {

        // calculate deduction based on price
        function calculateDeduction(price) {

          if (price < 1160000) {
            // less than 1,160,000 return price
            return price;
          } else if (price >= 1160000 && price < 2890000) {
            // between 1,160,000 and 2,890,000 return 1,160,000
            return 1160000;
          } else if (price >= 2890000 && price < 4049999) {
            // between 2,890,000 and 4,049,999 return delta
            return 1160000 - (price - 2890000);
          } else {
            // greater than 4049999 return 0
            return 0;
          }

        }

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

          // get estimated machine price (emp)
          let emp = empInput.value;

          // calculate deduction
          let deduction = calculateDeduction(emp);
          deductionInput.value = Math.round(deduction);

          // calculate balance
          let balance = emp - deduction;
          balanceInput.value = Math.round(balance);

          // calculate bonus depreciation
          let bonusDepreciation = balance * 0.8;
          bonusInput.value = Math.round(bonusDepreciation);

          // calculate standard depreciation
          let standardDepreciation = (balance - bonusDepreciation) * 0.1429;
          standardInput.value = Math.round(standardDepreciation);

          // calculate first year tax deduction
          let first = Math.round(deduction + bonusDepreciation + standardDepreciation);
          firstInput.value = first;

          // calculate tax savings based on assumed tax bracket
          bracket = bracketInput.value/100;
          let savings = first * bracket;
          savingsInput.value = Math.round(savings);

          // calculate payments
          let payments = savings/(emp * 0.02);
          paymentsInput.value = Math.round(payments);

        }

        // function to handle webforms
        function formWork(element) {

          // get webform element
          let webform = element;
          let webformClasses = webform.classList;
          const formNames = [...webformClasses];

          // if webform is tax calculator
          if (formNames.includes('webform-submission-tax-calculator-form')) {

            // get webform elements and values
            let webformElements = webform.elements;
            let empInput = webformElements['edit-estimated-machine-price'];
            let bracketInput = webformElements['edit-assumed-customer-tax-bracket'];

            // set default values
            empInput.value = 1950000;
            bracketInput.value = 32;

            // initialize calculations
            updateCalculations(webformElements);

            // update calculations on change of price (emp)
            empInput.addEventListener('change', (e) => {
              updateCalculations(webformElements);
            });

            // update calculations on change of tax bracket
            bracketInput.addEventListener('change', (e) => {
              updateCalculations(webformElements);
            });
            
          }

        }

        // check if webform is added by bigpipe
        const checkReadyState = setInterval(() => {
          if (document.readyState === "complete") {
            clearInterval(checkReadyState);
            formWork(element);
          }
        }, 100);

      },

    );

  }
};
