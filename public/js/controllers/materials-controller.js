"use strict";var materialsController=function(){function e(e){function t(){$("#search").keypress(function(t){13==t.which&&e.redirect("#/search")})}var n=firebase.database().ref();n.on("value",function(a){templates.get("materials").then(function(i){e.$element().html(i(a.val())),n.off("value"),t()})})}function t(e){templates.get("material-add").then(function(t){e.$element().html(t());var n=firebase.database().ref().child("added"),a=firebase.auth().currentUser,i=a.displayName,d=document.getElementById("tb-material-title"),r=document.getElementById("tb-material-text"),o=(document.getElementById("tb-material-link"),document.getElementById("tb-material-des")),l=document.getElementById("btn-add"),c=document.getElementById("alertMsg"),s=document.getElementById("uploader"),u=document.getElementById("fileButton"),m=document.getElementById("fileName"),f=firebase.storage().ref().child("FanfictionImages");u.addEventListener("change",function(e){var t=e.target.files[0],n=firebase.storage().ref("FanfictionImages/"+t.name),a=n.put(t);m.innerHTML=t.name,a.on("state_changed",function(e){var t=e.bytesTransferred/e.totalBytes*100;s.value=t})}),firebase.auth().onAuthStateChanged(function(e){e&&(c.classList.add("hidden"),l.classList.remove("hidden"))}),l.addEventListener("click",function(){var t=d.value,a=r.value,l=o.value,c=m.innerHTML,s=f.child(c),u=(new Date).toString().split(" ").splice(1,3).join(" ");s.getDownloadURL().then(function(d){n.push({title:t,text:a,description:l,imgUrl:d,author:i,date:u}),toastr.success("Added!"),e.redirect("#/fan-fiction")})})})}function n(e){function t(){var n=firebase.database().ref().child("added"),d=n.child(a),r=document.getElementById("tb-comment"),o=document.getElementById("btn-add-comment");firebase.auth().onAuthStateChanged(function(n){n?o.addEventListener("click",function(n){var o=firebase.auth().currentUser,l=o.displayName,c=o.photoURL,s=r.value,u=(new Date).toString().split(" ").splice(1,3).join(" ");d.push({comment:s,photoUrl:c,author:l,date:u}),i.on("value",function(n){var d=n.val().added[a];templates.get("material-details").then(function(n){e.$element().html(n(d)),i.off("value"),t()})}),toastr.success("Your Comment is Added!")}):o.addEventListener("click",function(e){toastr.warning("Register or LogIn to add a comment")})})}function n(){$("#search").keypress(function(t){13==t.which&&e.redirect("#/search")})}var a=e.params.id,i=firebase.database().ref();i.on("value",function(d){var r=d.val().added[a];templates.get("material-details").then(function(a){e.$element().html(a(r)),i.off("value"),t(),n()})})}return{all:e,add:t,one:n}}();