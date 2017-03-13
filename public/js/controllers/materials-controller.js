var materialsController = function () {

  function all(context) {
    const dbRef = firebase.database().ref();

    dbRef.on('value', function (snap) {
      // console.log(snap.val());
      templates.get('materials')
        .then(function (template) {
          context.$element().html(template(snap.val()));
          dbRef.off('value');
          search();
        });
    })

    function search() {
      var inputField = $('#search');
      inputField.keypress(function (event) {
        if (event.which == 13) {
          context.redirect('#/search')
        }
      });
    }
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
        const uploader = document.getElementById('uploader');
        const fileButon = document.getElementById('fileButton');
        const fileName = document.getElementById('fileName');
        const storageRef = firebase.storage().ref().child('FanfictionImages');

        fileButon.addEventListener('change', function (e) {
          var file = e.target.files[0];
          var storageRef = firebase.storage().ref('FanfictionImages/' + file.name);
          var task = storageRef.put(file);
          fileName.innerHTML = file.name;
          task.on('state_changed',
            function progress(snapshot) {
              var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploader.value = percentage;
            }
          );
        });

        //Add realtime listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            alertMsg.classList.add('hidden');
            buttonAdd.classList.remove('hidden')
          }
        })

        buttonAdd.addEventListener('click', function () {
          //Values
          let titleValue = titleField.value;
          let textValue = textField.value;
          let desValue = desField.value;
          let imgName = fileName.innerHTML;
          let imgRef = storageRef.child(imgName);
          let date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
          imgRef.getDownloadURL().then(function (url) {
            materialsRef.push({
              title: titleValue,
              text: textValue,
              description: desValue,
              imgUrl: url,
              author: userName,
              date: date
            })
            toastr.success('Added!');
            context.redirect('#/fan-fiction');
          });
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
          dbRef.off('value');
          comments();
          search();
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
            });
            dbRef.on('value', function (snap) {
              var detail = snap.val().added[detailId];
              templates.get('material-details')
                .then(function (template) {
                  context.$element().html(template(detail));
                  dbRef.off('value');
                  comments();
                });
            })
            toastr.success('Your Comment is Added!');
          });
        } else {
          btnAddComment.addEventListener('click', e => {
            toastr.warning('Register or LogIn to add a comment');
          });
        };
      });
    };

    function search() {
      var inputField = $('#search');
      inputField.keypress(function (event) {
        if (event.which == 13) {
          context.redirect('#/search')
        }
      });
    }
  }

  return {
    all: all,
    add: add,
    one: one
  };
}();