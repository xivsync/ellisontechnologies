/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./components/02-molecules/accordion/accordion.js ***!
  \********************************************************/
Drupal.behaviors.accordion={attach:function attach(a){var b=a.querySelectorAll(".js-accordion-item"),c=a.querySelectorAll(".js-accordion__controls"),d=".js-accordion-item__toggle",e="data-accordion-expanded",f="aria-expanded",g=function(a,b){a.setAttribute(e,"true"),b.setAttribute(f,"true")},h=function(a,b){a.setAttribute(e,"false"),b.setAttribute(f,"false")};b.forEach(function(a){var b=a.querySelector(d);h(a,b),b.addEventListener("click",function(){return"true"===b.getAttribute(f)?h(a,b):g(a,b)})}),c.forEach(function(a){var b=a.parentNode.querySelectorAll(".js-accordion-item");a.addEventListener("click",function(a){var c=a.target.classList.contains("js-accordion__toggle-all--expand");b.forEach(function(a){var b=a.querySelector(d);!1===c?h(a,b):g(a,b)})})})}};
/******/ })()
;
//# sourceMappingURL=accordion.js.map