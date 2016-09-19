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

var playerOneWins = 0;
var playerOneLoss = 0;
var playerOneName = '';
var playerOneChoice = '';
var playerTwoWins = 0;
var playerTwoLoss = 0;
var playerTwoName = '';
var playerTwoChoice = '';
var checkForWinner = false;
var turn = 1;

//connection
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
  //if they are connected
  if(snap.val()){
      //add user to connections list.
      var here = connectionsRef.push(true);
      //remove user from connection list when they disconnect.
      here.onDisconnect().remove();
  };
});

connectionsRef.on("value", function(snap) {
   playersConnected = (snap.numChildren());
   //only displays after two players have been connected.
   if(playersConnected === 2){
     database.ref().limitToFirst(2).on("child_added", function(snapshot) {
      database.ref().limitToFirst(1).on("value", function(snapshot) {
        $('#playerOneOptions').html('player one');
      });

      database.ref().limitToLast(1).on("value", function(snapshot) {
        $('#playerTwoOptions').html('player two');
      });
     });
    }
});

//updates firebase
database.ref('/bidderData').on("value", function(snapshot) {
  // if(player one and two exists{
  //   //print the names in their corresponding panel
  // }

// If any errors are experienced, log them to console. 
}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

});




//Grabbing name from user
$("#startGame").on("click", function() {
  var name = $('#userName').val().trim();
  
  if(playerOneName == ''){
    playerOneName = name;
  }
  else if(playerTwoName == ''){
    playerTwoName = name;
  }

  //store variables in firebase
  database.ref().set({
      player:{
        one:{
          name: playerOneName,
          wins: playerOneWins,
          loss: playerOneLoss,
        },
        two:{
          name: playerTwoName,
          wins: playerTwoWins,
          loss: playerTwoLoss,
        }
      },
      turn: turn
    });
});

//if both players are set, set turn to 1
  //message to player one - playerOneName + ', it's your turn!'
  //message to player two - 'Waiting for ' + playerOneName;
//after player one chooses, set turn to 2
  //message to player one - 'Waiting for ' + playerTwoName;
  //message to player two - playerTwoName + ', it's your turn!'

//function rps
//sets up clickable rock paper scissor buttons
//if turn ==1 display in playerOneOptions
//if turn ==2 display in playerTwoOptions

//on click, sets value to corresponding players choice.
//displays players choice to their corresponding panel
//after playerTwo chooses, set checkForWinner to true

function whoWon(){
  //displays both players' choices
  $('#playerOnePick').text(playerOneName + ': ' + playerOneChoice);
  $('#playerOnePick').text(playerTwoName + ': ' + playerTwoChoice);

  if (playerOneChoice == playerTwoChoice){
    $('#winner').html("It's a tie!");
  }
  else if ((playerOneChoice == 'Rock') && (playerTwoChoice == 'Paper')){
    $('#winner').html(playerTwoName + ' wins!');
    playerOneLoss++;
    playerTwoWins++;
  }
  else if ((playerOneChoice == 'Rock') && (playerTwoChoice == 'Scissors')){
    $('#winner').html(playerOneName + ' wins!');
    playerOneWins++;
    playerTwoLoss++;
  }
  else if ((playerOneChoice == 'Scissors') && (playerTwoChoice == 'Paper')){
    $('#winner').html(playerOneName + ' wins!');
    playerOneWins++;
    playerTwoLoss++;
  }
  else if ((playerOneChoice == 'Scissors') && (playerTwoChoice == 'Rock')){
    $('#winner').html(playerTwoName + ' wins!');
    playerOneLoss++;
    playerTwoWins++;
  }
  else if ((playerOneChoice == 'Paper') && (playerTwoChoice == 'Scissors')){
    $('#winner').html(playerTwoName + ' wins!');
    playerOneLoss++;
    playerTwoWins++;
  }
  else if ((playerOneChoice == 'Paper') && (playerTwoChoice == 'Rock')){
    $('#winner').html(playerOneName + ' wins!');
    playerOneWins++;
    playerTwoLoss++;
  }
}

//Chatbox
$("#sendChat").on("click", function() {
  var chatComment = $('#userChat').val().trim();
  var chat = $('<div>');
  //if input came from playerOne
    //chatComment.prepend(playerOneName + ': ');

  //else if input came from playerTwo
    //chatComment.prepend(playerTwoName + ': ');
    chat.append(chatComment);
  $('.chatbox').append(chat);

});

//sends to whoWon function after both players have won.
if (checkForWinner == true){
  whoWon();
}
