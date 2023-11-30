Drupal.behaviors.top = {
  attach: function (context, settings) {
    // Use context to filter the DOM to only the elements of interest,
    // and use once() to guarantee that our callback function processes
    // any given element one time at most, regardless of how many times
    // the behaviour itself is called (it is not sufficient in general
    // to assume an element will only ever appear in a single context).
    once('fixHeader', 'body.path-frontpage header.header', context).forEach(
      
      function (element) {

        let scrollpos = window.scrollY;
        const header = element;
        const header_height = header.offsetHeight;
      
        const add_class_on_scroll = () => header.classList.add("add-bg");
        const remove_class_on_scroll = () => header.classList.remove("add-bg");
      
        window.addEventListener('scroll', function() { 
          scrollpos = window.scrollY;
      
          if (scrollpos >= header_height) {
            add_class_on_scroll();
          } else {
            remove_class_on_scroll();
          }
      
          console.log(scrollpos);
          
        })
        
      }
      
    );

  }
};
