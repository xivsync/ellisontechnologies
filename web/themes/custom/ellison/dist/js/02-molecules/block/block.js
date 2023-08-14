/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./components/02-molecules/block/block.js ***!
  \************************************************/
Drupal.behaviors.blocks={attach:function attach(a){once("handleExposedForm",".views-exposed-form",a).forEach(function(a){var b=drupalSettings.ellison.session_region,c=document.getElementById("locations-current");c&&(c.innerText="Your selected location is ".concat(b,".")),window.addEventListener("load",function(){var b=a.querySelector(".form-submit"),c=a.querySelector(".form-item__label"),d=a.elements;if(d.hasOwnProperty("region_id")&&drupalSettings.hasOwnProperty("ellison")&&c){var e=drupalSettings.ellison.session_region_id;d.region_id.value!==e&&(d.region_id.value=e,b.click())}})})}};
/******/ })()
;
//# sourceMappingURL=block.js.map