var materialsController = function () {

  function all(context) {
    const dbRef = firebase.database().ref();

    dbRef.on('value', function (snap) {
      // console.log(snap.val());
      templates.get('materials')
        .then(function (template) {
          context.$element().html(template(snap.val()));
          dbRef.off('value');
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
        const desField = document.getElementById('tb-material-des');
        const buttonAdd = document.getElementById('btn-add');
        const alertMsg = document.getElementById('alertMsg');

        //Add realtime listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            alertMsg.classList.add('hidden');
            buttonAdd.classList.remove('hidden')
          }
        })

        buttonAdd.addEventListener('click', e => {
          //Values
          let titleValue = titleField.value;
          let textValue = textField.value;
          let desValue = desField.value;
          let linkValue = linkField.value;
          let date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
          materialsRef.push({
            title: titleValue,
            text: textValue,
            description: desValue,
            imgUrl: linkValue,
            author: userName,
            date: date
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
      //console.log(detail)
      templates.get('material-details')
        .then(function (template) {
          context.$element().html(template(detail));
          comments();
        });
    })

    function comments() {
      //Database
      const databaseRef = firebase.database().ref().child('added');
      const materialRef = databaseRef.child(detailId);

      //Fields Selection
      const commentField = document.getElementById('tb-comment');
      const btnAddComment = document.getElementById('btn-add-comment');




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
          });
        }
      })


    }
    //setTimeout(comments, 3000);
  }

  return {
    all: all,
    add: add,
    one: one
  };
}();