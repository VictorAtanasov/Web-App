var searchController = function () {

  function all(context) {
    var inputField = document.getElementById('search');
    var inputFieldTxt = inputField.value;
    if (inputFieldTxt === ''){
      inputFieldTxt = 'pepe'
    };
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    var searchValue = toTitleCase(inputFieldTxt);
    inputField.value = '';
    const dbRef = firebase.database().ref('books');
    var query = dbRef.orderByChild("title").startAt(searchValue).endAt(searchValue + "\uf8ff");
    query.once("value", function (snapshot) {
      templates.get('search')
        .then(function (template) {
          context.$element().html(template(snapshot.val()));
          dbRef.off();
          search();
        });
    });

    function search() {
      var inputField = $('#search');
      inputField.keypress(function (event) {
        if (event.which == 13) {
          context.redirect('#/search');
          $(".navbar-collapse").collapse('hide');
        }
      });
    }
  }

  return {
    all: all
  };
}();