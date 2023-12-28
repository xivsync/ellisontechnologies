/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./components/03-organisms/slider/slider.js ***!
  \**************************************************/
Drupal.behaviors.glidejs={attach:function attach(a){once("implementGlideJs",".slider-on",a).forEach(function(a){window.addEventListener("load",function(){var b=a.querySelector(".group__group .glide"),c=a.dataset.visibleItems,d=new Glide(b,{type:"carousel",focusAt:"center",perView:c,autoplay:3500,hoverpause:!0,animationTimingFunc:"ease-in-out",animationDuration:800,breakpoints:{1024:{perView:2},768:{perView:1}}});d.mount()})})}};
/******/ })()
;
//# sourceMappingURL=slider.js.map