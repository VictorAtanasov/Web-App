var cartController = function () {

  function cart(context) {
    if (localStorage.carty == undefined){
      var storage = undefined;
    } else{
      var storage = JSON.parse(localStorage.carty); 
    }
    templates.get('cart')
      .then(function (template) {
        context.$element().html(template(storage));
      });
  }

  return {
    cart: cart
  };
}();