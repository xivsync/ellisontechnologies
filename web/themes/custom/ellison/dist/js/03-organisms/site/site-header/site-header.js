/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************************!*\
  !*** ./components/03-organisms/site/site-header/site-header.js ***!
  \*****************************************************************/
Drupal.behaviors.top={attach:function attach(a){once("fixHeader","body.path-frontpage header.header",a).forEach(function(a){var b=window.scrollY,c=a,d=c.offsetHeight,e=function(){return c.classList.add("add-bg")},f=function(){return c.classList.remove("add-bg")};window.addEventListener("scroll",function(){b=window.scrollY,b>=d?e():f(),console.log(b)})})}};
/******/ })()
;
//# sourceMappingURL=site-header.js.map