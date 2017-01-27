var materialsController = function() {

  function all(context) {
    const dbRef = firebase.database().ref();
    dbRef.on('value', function(snap) {
      templates.get('materials')
      .then(function(template) {
        context.$element()
        .html(template(snap.val()));
      });
    })
  }

      function add(context){
        templates.get('material-add')
         .then(function(template){
            context.$element().html(template());
            // $('#btn-material-add').on('click', function(){
            //     var todo = {
            //         title: $('#tb-material-text').val(),
            //         description: $('#tb-material-des').val(),
            //         img: $('#tb-material-link').val()
            //     };
            //     data.todos.add(todo)
            //      .then(function(todo){
            //         todo = todo.result;
            //         toastr.success('Added!');
            //         context.redirect('#/materials');
            //     });
            // })
        });
    }

  return {
    all: all,
    add: add
  };
}();