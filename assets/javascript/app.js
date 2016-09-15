 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFHYHDt6CFLh-PC7gLjYgTw5ldiBDshtA",
    authDomain: "rps-multiplayer-3e7d4.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-3e7d4.firebaseio.com",
    storageBucket: "rps-multiplayer-3e7d4.appspot.com",
    messagingSenderId: "114208673769"
  };
  firebase.initializeApp(config);

  var database = firebase.database();