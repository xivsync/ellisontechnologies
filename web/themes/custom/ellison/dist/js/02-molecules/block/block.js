/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./components/02-molecules/block/block.js ***!
  \************************************************/
Drupal.behaviors.blocks={attach:function attach(a){once("handleExposedForm",".view--locations .views-exposed-form",a).forEach(function(a){var b=drupalSettings.ellison.session_region,c=a.querySelector(".form-item__label");c&&(c.innerHTML="Your preferred location is <strong>".concat(b,"</strong>. <em>Select a different location for nearby offices</em>.")),window.addEventListener("load",function(){var b=a.querySelector(".form-submit"),c=a.elements;if(c.hasOwnProperty("region_id")&&drupalSettings.hasOwnProperty("ellison")){var d=drupalSettings.ellison.session_region_id;c.region_id.value!==d&&(c.region_id.value=d,b.click())}})})}};
/******/ })()
;
//# sourceMappingURL=block.js.map