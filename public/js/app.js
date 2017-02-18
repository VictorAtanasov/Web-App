(function () {
    var sammyApp = Sammy('#content', function () {
        this.get('#/', function () {
            this.redirect('#/home')
        });
        this.get('#/home', homeController.all);
        this.get('#/about', aboutController.all);
        this.get('#/blog', blogController.all);

        this.get('#/login', usersController.login);
        this.get('#/register', usersController.register);

        this.get('#/fan-fiction', materialsController.all);
        this.get('#/fan-fiction/add', materialsController.add);
        this.get('#/fan-fiction/:id', materialsController.one);

        this.get('#/book-categories', categoriesController.all);
        this.get('#/book-categories/:id', categoriesController.one);
        this.get('#/book-categories/:id/:id', categoriesController.book);

    })

    $(function () {
        sammyApp.run('#/');
    })
}());

const dropdownEl = $('.dropdownEl');
const dropdownLi = $('.dropdown');
dropdownEl.on('click', function () {
    dropdownLi.removeClass('open')
});


		
