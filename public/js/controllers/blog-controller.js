var blogController = function() {

  function all(context) {
    templates.get('blog')
      .then(function(template) {
        context.$element().html(template()); 
      });
  }

  return {
    all: all
  };
}();