var cartController = function () {

  function cart(context) {
    if (localStorage.carty == undefined){
      var storage = undefined;
    } else{
      var storage = JSON.parse(localStorage.carty);
      //console.log(storage)
      var cart = carty({
        storage: carty.storage.localStorage(),
        currency: 'USD'
      });
    }
    templates.get('cart')
      .then(function (template) {
        context.$element().html(template(storage));
        total();
        remove();
      });

    function total(){
      var tempPrice = 0;
      var tempQuantity = 0;
      var tempTotal = 0;
      var total = 0;
      for (var key in storage) {
        var obj = storage[key];
        for (var prop in obj) {
          if (prop == 'price'){
            tempPrice = obj[prop];
          } else if (prop == 'quantity'){
            tempQuantity = obj[prop];
          } else if (tempPrice != 0 && tempQuantity != 0){
            tempTotal = tempQuantity * tempPrice;
            total += tempTotal;
            tempPrice = 0;
            tempQuantity = 0;
            tempTotal = 0;
          }
        }
      }
      var totalPrice = document.getElementById('totalPrice');
      totalPrice.innerHTML += total
    }

    function remove(){
      var remove = $('.remove');
      remove.on('click', function(){
        var $this = $(this);
        var valId = $this.next().html();
        storage.splice(valId,1);
        var newStorage = JSON.stringify(storage);
        localStorage.carty = newStorage;
        location.reload();
      })
    }
  }

  return {
    cart: cart
  };
}();