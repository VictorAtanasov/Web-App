"use strict";var aboutController=function(){function t(t){function e(){$("#search").keypress(function(e){13==e.which&&t.redirect("#/search")})}templates.get("about").then(function(n){t.$element().html(n()),e()})}return{all:t}}();