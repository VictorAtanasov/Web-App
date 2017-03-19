var data = function(){
    // const STORAGE_AUTH_KEY = 'SPECIAL-AUTHENTICATION-KEY';
    
    /*USERS*/
//     function register(user){
//         var promise = new Promise(function(resolve, reject){
//         //   var url = 'api/users';
//             // var reqUser = {
//             //     username: user.username,
//             //     password: user.password
//             // }
            
//         //   $.ajax(url, {
//         //       method: 'POST',
//         //       contentType: 'application/json',
//         //       data: JSON.stringify(reqUser),
//         //       success: function(res){
//         //           resolve(res);
//         //       }
//         //   });
        
//         });
//         return promise;
//     }  
//     function login(user){
//         var promise = new Promise(function(resolve, reject){
//         //   var url = 'api/users/auth';
//         //     var reqUser = {
//         //         username: user.username,
//         //         password: user.password
//         //     }
            
//         //   $.ajax(url, {
//         //       method: 'PUT',
//         //       contentType: 'application/json',
//         //       data: JSON.stringify(reqUser),
//         //       success: function(res){
//         //           localStorage.setItem(STORAGE_AUTH_KEY, res.result.authKey);
//         //           resolve(res);
//         //       }
//         //   });
//         });
//         return promise;
//     }
    
//     function userLogout() {
//         var promise = new Promise(function(resolve, reject) {
//           localStorage.removeItem(STORAGE_AUTH_KEY);
//           resolve();
//         });

//     return promise;
//    }
    
    /*Materials*/
    // function materialsGet(){
    //     // var promise = new Promise(function(resolve, reject){
    //     //     const dbRef = firebase.database().ref();
    //     //     dbRef.on('value', function(snap) {
    //     //     console.log(snap.val());
    //     //   })
    //     // });
    //     // return promise
        
    // }
    
    // function materialAdd(todo){
    //     var promise = new Promise(function(resolve, reject){
    //         // var url = 'api/materials';
    //         // $.ajax(url, {
    //         //     method: 'POST',
    //         //     contentType: 'application/json',
    //         //     data: JSON.stringify(todo),
    //         //     headers: {
    //         //       'x-auth-key': localStorage.getItem(STORAGE_AUTH_KEY)  
    //         //     }, 
    //         //     success: function(res){
    //         //       resolve(res);
    //         //     },
    //         //     error: function(err){
    //         //         toastr.error('Login or Register First!')
    //         //         reject(err);
    //         //     }
    //         // })
    //     });
    //     return promise
    // }
    
    //   function threadById(id) {
    //     var promise = new Promise(function(resolve, reject) {
    //     //   $.getJSON(`api/materials/${id}`, function(res) {
    //     //     resolve(res);
              
    //     //   });
    //     });
    //     return promise;
    //  }
    
    
    return{
        // users:{
        //     register: register,
        //     login: login,
        //     logout: userLogout
        // },
        todos:{
            // get: materialsGet,
            // add: materialAdd,
            // getById: threadById
        }
    }
}();