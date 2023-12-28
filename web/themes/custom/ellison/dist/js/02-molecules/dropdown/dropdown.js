/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************************!*\
  !*** ./components/02-molecules/dropdown/dropdown.js ***!
  \******************************************************/
Drupal.behaviors.dropdown={attach:function attach(a){once("enableDropdown",".dropdown",a).forEach(function(a){var b=a.dataset.dropdownUniqueId,c=document.getElementById("toggle-".concat(b));c.addEventListener("click",function(a){var b=a.target,c=b.dataset.dropdownUniqueId,d=document.getElementById("dropdown-".concat(c)),e=d.dataset.dropdownState;b.setAttribute("aria-expanded","expanded"!==e),d.dataset.dropdownState="expanded"===e?"collapsed":"expanded",d.classList.remove("expanded"===e?"state-is-expanded":"state-is-collapsed"),d.classList.add("expanded"===e?"state-is-collapsed":"state-is-expanded")})})}};
/******/ })()
;
//# sourceMappingURL=dropdown.js.map