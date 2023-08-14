/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./components/01-atoms/videos/video-embed.js ***!
  \***************************************************/
Drupal.behaviors.responsiveEmbeddedVideos={attach:function attach(a){var b=a.querySelectorAll("iframe[src*=\"youtube.com\"]","iframe[src*=\"vimeo.com\"]");b&&Array.from(b).forEach(function(a){var b=a.getAttribute("width"),c=a.getAttribute("height"),d="".concat(b," / ").concat(c),e=a.parentNode;e.style.aspectRatio=d,a.removeAttribute("height"),a.removeAttribute("width")})}};
/******/ })()
;
//# sourceMappingURL=video-embed.js.map