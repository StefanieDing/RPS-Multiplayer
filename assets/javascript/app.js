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
var playerOneChoice;
var playerTwoWins = 0;
var playerTwoLoss = 0;
var playerTwoName = '';
var checkForWinner = false;
var turn;


database.ref('/bidderData').on("value", function(snapshot) {

// If any errors are experienced, log them to console. 
}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

});

//Grabbing name from user
$("#startGame").on("click", function() {
  var name = $('#userName').val().trim();
  //if playerOneName is empty, set input userName to it
  //display playerOneName

  //if playerOne isn't empty set playerTwoName to input userName
  //display playerTwoName

  //store variables in firebase
  database.ref().set({
      one: playerOneName,
      two: playerTwoName
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

//if checkForWinner is true, send to whoWon function

//function whoWon
  //displays both players' choices
  //$('#playerOnePick').text(playerOneName + ': ' + playerOneChoice);
  //$('#playerOnePick').text(playerTwoName + ': ' + playerTwoChoice);

  // if (playerOneChoice == playerTwoChoice){
  //   $('#winner').html('It's a tie');
  // }
  // else if ((playerOneChoice == 'Rock') && == (playerTwoChoice == 'Paper'){
  //   $('#winner').html(playerTwoName + ' wins!');
  //   playerOneLoss++;
  //   playerTwoWins++;
  // }
  // else if ((playerOneChoice == 'Rock') && == (playerTwoChoice == 'Scissors'){
  //   $('#winner').html(playerOneName + ' wins!');
  //   playerOneWins++;
  //   playerTwoLoss++;
  // }
  // else if ((playerOneChoice == 'Scissors') && == (playerTwoChoice == 'Paper'){
  //   $('#winner').html(playerOneName + ' wins!');
  //   playerOneWins++;
  //   playerTwoLoss++;
  // }
  // else if ((playerOneChoice == 'Scissors') && == (playerTwoChoice == 'Rock'){
  //   $('#winner').html(playerTwoName + ' wins!');
  //   playerOneLoss++;
  //   playerTwoWins++;
  // }
  // else if ((playerOneChoice == 'Paper') && == (playerTwoChoice == 'Scissors'){
  //   $('#winner').html(playerTwoName + ' wins!');
  //   playerOneLoss++;
  //   playerTwoWins++;
  // }
  // else if ((playerOneChoice == 'Paper') && == (playerTwoChoice == 'Rock'){
  //   $('#winner').html(playerOneName + ' wins!');
  //   playerOneWins++;
  //   playerTwoLoss++;
  // }

//Chatbox
$("#sendChat").on("click", function() {
  var chatComment = $('#userChat').val().trim();

  //if input came from playerOne
    //prepend playerOneName to chatComment

  //else if input came from playerTwo
    //prepend playerTwoName to chatComment

  $('.chatbox').append(chatComment);

});
