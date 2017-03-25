"use strict";!function(){var t=Sammy("#content",function(){this.get("#/",function(){this.redirect("#/home")}),this.get("#/home",homeController.all),this.get("#/about",aboutController.all),this.get("#/search",searchController.all),this.get("#/shopping-cart",cartController.cart),this.get("#/wishlist",wishlistController.wishlist),this.get("#/login",usersController.login),this.get("#/register",usersController.register),this.get("#/fan-fiction",materialsController.all),this.get("#/fan-fiction/add",materialsController.add),this.get("#/fan-fiction/:id",materialsController.one),this.get("#/book-categories",categoriesController.all),this.get("#/book-categories/:id",categoriesController.one),this.get("#/book-categories/:id/:id",categoriesController.book)});$(function(){t.run("#/")})}();var dropdownEl=$(".dropdownEl"),dropdownLi=$(".dropdown");dropdownEl.on("click",function(){dropdownLi.removeClass("open")}),$("#content").click(function(t){var o=$(t.target),e=$(".navbar-collapse");e.hasClass("in")!==!0||o.hasClass("navbar-toggle")||e.collapse("hide")});