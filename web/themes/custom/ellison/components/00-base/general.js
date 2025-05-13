// This file contains JavaScript for the Ellison theme.
  document.addEventListener('DOMContentLoaded', function () {
    // Check if there is a referrer, which is a hint there's a previous page
    if (document.referrer && document.referrer !== window.location.href) {
      const backButton = document.querySelector('.back-button-wrapper');
      if (backButton) {
        backButton.style.display = 'block';
      }
    }
  });
