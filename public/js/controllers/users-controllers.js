"use strict";var usersController=function(){function e(e){templates.get("register").then(function(t){e.$element().html(t());var n=document.getElementById("tb-email"),r=document.getElementById("tb-password"),s=document.getElementById("tb-userName"),a=document.getElementById("tb-photoUrl"),d=document.getElementById("btn-register"),o=document.getElementById("btn-login"),i=document.getElementById("btn-logout"),u=document.getElementById("emailReg"),c=document.getElementById("passwordReg");o.addEventListener("click",function(t){var s=n.value,a=r.value;firebase.auth().signInWithEmailAndPassword(s,a).then(function(e){return toastr.success("Hello Again! You Are Loged In")},e.redirect("#/home")).catch(function(e){return toastr.error(e.message)})}),d.addEventListener("click",function(t){var n=u.value,r=c.value,d=s.value,o=a.value;firebase.auth().createUserWithEmailAndPassword(n,r).then(function(e){return toastr.success("Hello "+d+"! You Are Registered & Loged In")},e.redirect("#/home")).catch(function(e){return toastr.error(e.message)}),firebase.auth().onAuthStateChanged(function(e){e&&firebase.auth().currentUser.updateProfile({displayName:d,photoURL:o})})}),i.addEventListener("click",function(t){firebase.auth().signOut(),toastr.warning("You are loged out"),e.redirect("#/home")}),firebase.auth().onAuthStateChanged(function(e){e?(i.classList.remove("hidden"),d.classList.add("hidden"),o.classList.add("hidden")):(i.classList.add("hidden"),d.classList.remove("hidden"),o.classList.remove("hidden"))})})}return{register:e}}();