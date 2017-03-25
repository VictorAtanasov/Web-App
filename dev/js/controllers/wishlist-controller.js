var wishlistController = function () {

    function wishlist(context) {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                var user = firebase.auth().currentUser;
                var userUid = user.uid;
                var wishlistRef = firebase.database().ref().child('wishlist').child(userUid);
                wishlistRef.on('value', function (snap) {
                    templates.get('wishlist')
                        .then(function (template) {
                            context.$element().html(template(snap.val()));
                            wishlistRef.off('value');
                            remove(userUid);
                            search();
                            cart(userUid);
                        });
                });
            } else {
                templates.get('wishlist')
                    .then(function (template) {
                        context.$element().html(template());
                        search();
                    });
            }
        })

        function search() {
            var inputField = $('#search');
            inputField.keypress(function (event) {
                if (event.which == 13) {
                    context.redirect('#/search');
                    $(".navbar-collapse").collapse('hide');
                }
            });
        }

        function remove(userUid) {
            var wishlistRef = firebase.database().ref().child('wishlist').child(userUid);
            var remove = $('.remove');
            remove.on('click', function () {
                var $this = $(this);
                var valId = $this.next().html();
                wishlistRef.child(valId).remove();
                wishlistRef.off();
                location.reload();
            });
        }

        function cart(userUid) {
            var cartBtn = $('.add-to-cart');
            var cart = carty({
                storage: carty.storage.localStorage(),
                currency: 'USD'
            });
            cartBtn.on('click', function () {
                var $this = $(this);
                var parent = $this.parents('.cartItem');
                var itemPrice = parent.find('#price').html();
                var itemName = parent.find('#title').html();
                var itemAuthor = parent.find('#author').html();
                var image = parent.find('#image').attr('src');
                var url = parent.find('#title').attr('href');
                cart.add({
                    id: itemName,
                    label: itemAuthor,
                    price: itemPrice,
                    quantity: 1,
                    author: itemAuthor,
                    title: itemName,
                    imageUrl: image,
                    itemUrl: url
                });
                toastr.success(itemName + ' is added to your cart');
            })
        }
    }

    return {
        wishlist: wishlist
    };
}();