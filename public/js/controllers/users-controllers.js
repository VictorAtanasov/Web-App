var usersController = function () {

    function authentication(context) {
        templates.get('register')
            .then(function (template) {
                context.$element().html(template());

                //Get Elements
                const emailField = document.getElementById('tb-email');
                const passField = document.getElementById('tb-password');
                const userNameField = document.getElementById('tb-userName');
                const btnRegister = document.getElementById('btn-register');
                const btnLogin = document.getElementById('btn-login');
                const btnLogout = document.getElementById('btn-logout');

                //Add Login event
                btnLogin.addEventListener('click', e => {
                    //Get Email & Pass
                    const email = emailField.value;
                    const pass = passField.value;
                    const auth = firebase.auth();
                    //Sign In
                    const promise = auth.signInWithEmailAndPassword(email, pass);
                    promise
                        .then(user => toastr.success('You Are Loged In'))
                        .catch(e => toastr.error(e.message));
                })

                //Add Signup event
                btnRegister.addEventListener('click', e => {
                    //Get Email & Pass
                    const email = emailField.value;
                    const pass = passField.value;
                    const userName = userNameField.value; 
                    const auth = firebase.auth();
                    //Register
                    const promise = auth.createUserWithEmailAndPassword(email, pass);
                    promise
                        .then(user => toastr.success('You Are Registered'))
                        .catch(e => toastr.error(e.message));
                    firebase.auth().onAuthStateChanged(firebaseUser => {
                        if (firebaseUser) {
                            var user = firebase.auth().currentUser;
                            user.updateProfile({
                                displayName: userName
                            })
                        }
                    })
                })
                
                //SignOut
                btnLogout.addEventListener('click', e => {
                    firebase.auth().signOut();
                    toastr.warning('You are loged out')
                })

                //Add realtime listener
                firebase.auth().onAuthStateChanged(firebaseUser => {
                    if (firebaseUser) {
                        //console.log(firebaseUser.displayName);
                        //toastr.success('You Are Loged In');
                        btnLogout.classList.remove('hidden');
                        btnRegister.classList.add('hidden');
                        btnLogin.classList.add('hidden');
                    } else {
                        btnLogout.classList.add('hidden');
                        btnRegister.classList.remove('hidden');
                        btnLogin.classList.remove('hidden');
                    }
                })
            });
    };

    return {
        register: authentication
    };
}();