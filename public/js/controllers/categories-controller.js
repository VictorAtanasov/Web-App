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
        });
    })

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
    // setTimeout(comments, 3000);
  }


  return {
    all: all,
    one: one,
    book: book
  };
}();