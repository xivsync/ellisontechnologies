/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ./components/01-atoms/videos/video.js ***!
  \*********************************************/
Drupal.behaviors.responsiveEmbeddedVideos={attach:function attach(a){function b(a){var b=a.getAttribute("width"),c=a.getAttribute("height"),d="".concat(b," / ").concat(c),e=a.parentNode;e.style.aspectRatio=d,a.setAttribute("height","100%"),a.setAttribute("width","100%")}once("enableResponsiveEmbeddedVimeo","iframe[src*=\"vimeo.com\"]",a).forEach(function(a){b(a)}),once("enableResponsiveEmbeddedYouTube","iframe[src*=\"youtu\"]",a).forEach(function(a){b(a)})}};
/******/ })()
;
//# sourceMappingURL=video.js.map