var categoriesController = function() {

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
    //console.log(detailId)
    const dbRef = firebase.database().ref();
    dbRef.on('value', function (snap) {
      var detail = snap.val().books[detailId];
      templates.get('category')
        .then(function (template) {
          context.$element().html(template(detail));
        });
    })
  }

  function book(context) {
    var path = context.path.split( '/' );
    var catId = path[3]; 
    var detailId = context.params.id;
    const dbRef = firebase.database().ref().child('books');
    dbRef.on('value', function (snap) {
      var detail = snap.val()[catId][detailId];
      templates.get('book')
        .then(function (template) {
          context.$element().html(template(detail));
        });
    })
  }

  // function categories(context) {
  //   const dbRef = firebase.database().ref();
  //   dbRef.on('value', function (snap) {
  //     templates.get('categories')
  //       .then(function (template) {
  //         context.$element().html(template(snap.val()));
  //       });
  //   })
  // }

  return {
    all: all,
    one: one,
    book: book
  };
}();