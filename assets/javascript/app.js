// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1O82mtaSF2dbvgSC6_-zbGzX4mqLTbSY",
  authDomain: "rps-multiplayer-22593.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-22593.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "238177865880"
};
firebase.initializeApp(config);

var database = firebase.database();

var playerOneWins = 0;
var playerOneLoss = 0;
var playerOneName='';
var playerOneChoice = '';
var playerTwoWins = 0;
var playerTwoLoss = 0;
var playerTwoName='';
var playerTwoChoice = '';
var checkForWinner = false;
var turn;
var rps = ['Rock', 'Paper', 'Scissors'];
var readyPlay = false;
var playersConnected = 0;

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
   console.log(playersConnected);
});

//updates firebase
database.ref().on("value", function(snapshot) {
  if((snapshot.child('oneName').exists) && (snapshot.child('twoName').exists)){
    $('.playerOneName').html((snapshot.val().player.one.oneName));
    $('.playerTwoName').html((snapshot.val().player.two.twoName));
  }

  $('#playerOneProgess').html('Wins: '+ (snapshot.val().player.one.wins) + ' Loss: ' + (snapshot.val().player.one.loss) );
  $('#playerTwoProgess').html('Wins: '+ (snapshot.val().player.two.wins) + ' Loss: ' + (snapshot.val().player.two.loss) );

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
          oneName: playerOneName,
          wins: playerOneWins,
          loss: playerOneLoss,
        },
        two:{
          twoName: playerTwoName,
          wins: playerTwoWins,
          loss: playerTwoLoss,
        }
      },
      turn: turn
    });

  if ((playerOneName != '') && (playerTwoName != '')){
    turn =1;
    readyPlay = true;
  }

});

if(playersConnected == 2){
//displays only to player one
database.ref().limitToFirst(1).on("child_added", function(snapshot) {
     if(turn === 1){
      $('#playerOneMsg').html(playerOneName + ", it's your turn!");

      for(var i = 0; i < rps.length; i++){
        var choices = $('<div>');
        choices.attr('data-choice', rps[i]);
        choices.addClass(rockPScissors);
        choices.text(rps[i]);
        $('#playerOneOptions').append(choices);
      }
     } else if(turn === 2){
      $('#playerOneMsg').html('Waiting for '+ playerTwoName);
     }
});

//displays only to player two
database.ref().limitToLast(1).on("child_added", function(snapshot) {
     if(turn === 2){
      $('#playerTwoMsg').html(playerTwoName + ", it's your turn!");

      for(var i = 0; i < rps.length; i++){
        var choices = $('<div>');
        choices.attr('data-choice', rps[i]);
        choices.addClass(rockPS);
        choices.text(rps[i]);
        $('#playerTwoOptions').append(choices);
      }
     } else if(turn === 1){
        $('#playerTwoOptions').html('Waiting for ' + playerOneName);
     }
});
}

//when player one chooses
$('.rockPScissors').on('click', function(){
  playerOneChoice = $(this).data('choice');
  $('#playerOneOptions').empty();

  database.ref().limitToFirst(1).on("child_added", function(snapshot){
    $('#playerOneChoice').html(playerOneChoice);
  });

  turn = 2;
});
//when player two chooses
$('.rockPS').on('click', function(){
  playerTwoChoice = $(this).data('choice');
  $('#playerTwoOptions').empty();

  database.ref().limitToFirst(1).on("child_added", function(snapshot){
    $('#playerTwoChoice').html(playerTwoChoice);
  });

  turn = 1;
  checkForWinner = true;
});

//checks winner
function whoWon(){
  //displays both players' choices
  $('#playerOneChoice').html();
  $('#playerTwoChoice').html();

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

  //updates firebase
  database.ref().set({
     player:{
       one:{
        wins: playerOneWins,
        loss: playerOneLoss,
       },
       two:{
        wins: playerTwoWins,
        loss: playerTwoLoss,
       }
    }
  });
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

// sends to whoWon function after both players have chosen.
if (checkForWinner == true){
  whoWon();
}

