var homeController = function () {

  function all(context) {
    templates.get('home')
      .then(function (template) {
        context.$element().html(template());
        search();
      });

    function search() {
      var inputField = $('#search');
      inputField.keypress(function (event) {
        if (event.which == 13) {
          context.redirect('#/search')
        }
      });
    }
  }

  return {
    all: all
  };
}();