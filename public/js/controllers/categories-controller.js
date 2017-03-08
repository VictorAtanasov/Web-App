var categoriesController = function () {

  function all(context) {
    const dbRef = firebase.database().ref();
    dbRef.on('value', function (snap) {
      templates.get('categories')
        .then(function (template) {
          context.$element().html(template(snap.val()));
        });
    })
  }

  function one(context) {
    var detailId = context.params.id;
    const dbRef = firebase.database().ref('books');
    var query = dbRef.orderByChild("bookCategory").equalTo(detailId);
    query.once("value", function (snapshot) {
      templates.get('category')
        .then(function (template) {
          context.$element().html(template(snapshot.val()));
        });
    });
  }

  function book(context) {
    var detailId = context.params.id;
    const dbRef = firebase.database().ref().child('books').child(detailId);
    dbRef.on('value', function (snap) {
      var detail = snap.val();
      templates.get('book')
        .then(function (template) {
          context.$element().html(template(detail));
          comments();
          cart();
          wishlist();
        });
    })

    function wishlist(){
      const bookName = document.getElementById('itemName').innerText;
      const addToWishlistBtn = document.getElementById('wishlistBtn');
      var user = firebase.auth().currentUser;
      var userUid = user.uid;
      var wishlistRef = firebase.database().ref().child('wishlist');
      var test = 'E9NaBGxomwWpcBYu8aKlv4DTCDd2';
      var userWishlistRef = wishlistRef.child(userUid);

      addToWishlistBtn.addEventListener('click', e => {
        userWishlistRef.on('value', function(snap){
          var data = snap.val();
        });
        if (data == null){
            wishlistRef.child(userUid).set({
              id: detailId
            });
            toastr.success(bookName + 'is added to your wishlist')
          } else {
            var wishlistQuery = userWishlistRef.orderByChild("id").equalTo(detailId);
            wishlistQuery.once('value', function(snapshot){
              var wishlistQueryResult = snapshot.val();
              if (wishlistQueryResult == null){
                var obj = {
                  id: detailId
                }
                userWishlistRef.push(obj);
                toastr.success(bookName + 'is added to your wishlist')
              } else {
                  toastr.warning(bookName + ' is already added in your wishlist!')
              }
            })
            //console.log(wishlistQueryResult)
            
          };
      })
    }

    function cart() {
      const addToCartBtn = document.getElementById('cartBtn');
      const itemPrice = document.getElementById('price').innerText;
      const itemName = document.getElementById('itemName').innerText;
      const itemAuthor = document.getElementById('itemAuthor').innerText;
      const itemImage = document.getElementById('itemImage').src;
      const pageUrl = window.location.href;
      var cart = carty({
        storage: carty.storage.localStorage(),
        currency: 'USD'
      });
      addToCartBtn.addEventListener('click', e => {
        cart.add({
          id: itemName,
          label: itemAuthor,
          price: itemPrice,
          quantity: 1,
          author: itemAuthor,
          title: itemName,
          imageUrl: itemImage,
          itemUrl: pageUrl
        });
        toastr.success(itemName + ' is added to your cart')
      }) 
    };

    function comments() {
      const materialRef = dbRef;
      //Fields Selection
      const commentField = document.getElementById('tb-comment');
      const btnAddComment = document.getElementById('btn-add-comment');
      const alertMsg = document.getElementById('alertMsg');

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          btnAddComment.addEventListener('click', e => {
            //User
            var user = firebase.auth().currentUser;
            var userName = user.displayName;
            var photo = user.photoURL;
            let comment = commentField.value;
            let date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
            materialRef.push({
              comment: comment,
              photoUrl: photo,
              author: userName,
              date: date
            })
            toastr.success('Your Comment is Added!');
          });
        } else {
          btnAddComment.addEventListener('click', e => {
            toastr.warning('Register or LogIn to add a comment');
          })
        }
      })
    }
  }


  return {
    all: all,
    one: one,
    book: book
  };
}();