(function(){
    var sammyApp = Sammy('#content', function(){
        this.get('#/', function(){
            this.redirect('#/home')
        });
        this.get('#/home', homeController.all);
        
        this.get('#/login', usersController.login);
        this.get('#/register', usersController.register);
        
        this.get('#/fan-fiction', materialsController.all);
        this.get('#/fan-fiction/add', materialsController.add);
        
        this.get('#/fan-fiction/:id', materialsController.one);
        // this.get('#/material/one', materialsController.one);
    })
    
    $(function(){
        sammyApp.run('#/');
    })
}());