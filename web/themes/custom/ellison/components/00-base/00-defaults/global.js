function offsetAnchor() {
    if (location.hash.length !== 0) {
      window.scrollTo(window.scrollX, window.scrollY - 100);
    }
  }
  
  window.addEventListener("hashchange", offsetAnchor);
  
  window.setTimeout(offsetAnchor, 1);