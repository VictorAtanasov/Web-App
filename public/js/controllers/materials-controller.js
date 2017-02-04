var materialsController = function () {

  function all(context) {
    const dbRef = firebase.database().ref();
    
    dbRef.on('value', function (snap) {
      // console.log(snap.val());
      templates.get('materials')
        .then(function (template) {
          context.$element().html(template(snap.val()));
        });
    })
  }


  function add(context) {
    templates.get('material-add')
      .then(function (template) {
        context.$element().html(template());

        const materialsRef = firebase.database().ref().child('added');
        var user = firebase.auth().currentUser;
        var userName = user.displayName;

        //Fields Selection
        const titleField = document.getElementById('tb-material-title');
        const textField = document.getElementById('tb-material-text');
        const linkField = document.getElementById('tb-material-link');
        const buttonAdd = document.getElementById('btn-add');

        buttonAdd.addEventListener('click', e => {
          //Values
          let titleValue = titleField.value;
          let textValue = textField.value;
          let linkValue = linkField.value;
          materialsRef.push({
            title: titleValue,
            text: textValue,
            imgUrl: linkValue,
            author: userName
          })
          toastr.success('Added!');
          context.redirect('#/fan-fiction');
        });
      });
  }

  function one(context) {
    var detailId = context.params.id;
    const dbRef = firebase.database().ref();
    
    dbRef.on('value', function (snap) {
      var detail = snap.val().added[detailId];
      
      templates.get('material-details')
        .then(function (template) {
          context.$element().html(template(detail));
        });
    })
  }

  return {
    all: all,
    add: add,
    one: one
  };
}();