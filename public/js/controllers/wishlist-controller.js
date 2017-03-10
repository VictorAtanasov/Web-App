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
                        });
                });
            } else {
                templates.get('wishlist')
                    .then(function (template) {
                        context.$element().html(template());
                    });
            }
        })

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
    }

    return {
        wishlist: wishlist
    };
}();