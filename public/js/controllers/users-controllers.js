var usersController = function() {

  function login(context){
      
  };
    
    function register(context){
        templates.get('register')
        .then(function(template){
            context.$element().html(template());
            //attach events
            $('#btn-register').on('click', function(){
                var user = {
                    username: $('#tb-username').val(),
                    password: $('#tb-password').val()
                };
                data.users.register(user)
                .then(function(){
                    toastr.success('You are registered')
                    context.redirect('#/');
                })
            });
            
            $('#btn-login').on('click', function(){
                var user = {
                    username: $('#tb-username').val(),
                    password: $('#tb-password').val()
                };
                data.users.login(user)
                .then(function(){
                    toastr.success('You Are Loged In')
                    context.redirect('#/');    
                })
            })
            
            $('#btn-logout').on('click', function() {
                data.users.logout()
                  .then(function() {
                    location = '#/';
                    document.location.reload(true);
          });
      });
        });
    };

  return {
    register: register,
    login: login
  };
}();