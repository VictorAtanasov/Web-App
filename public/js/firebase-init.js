(function() {
    // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDiTLrdu6mjdCiKMSoKDUJg1WOADYPQ03E",
            authDomain: "web-app-66bd5.firebaseapp.com",
            databaseURL: "https://web-app-66bd5.firebaseio.com",
            storageBucket: "web-app-66bd5.appspot.com",
            messagingSenderId: "800220583114"
        };
        firebase.initializeApp(config);

    //test firebase
    const dbRefObject = firebase.database().ref().child('obj');
    dbRefObject.on('value', snap => console.log(snap.val()));
}())
