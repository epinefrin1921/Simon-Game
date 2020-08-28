var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence() {
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
};

$(document).keypress(function() {
  if (level === 0) {
    $("h1").text("Level " + level);
    nextSequence();
  }
});


$(".btn").click(function() {
  userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

function animatePress(currentColour) {
  $('.' + currentColour).addClass("pressed");

  setTimeout(function() {
    $('.' + currentColour).removeClass("pressed");

  }, 100);

};

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  };
};

function startOver() {
  level = 0;
  gamePattern = [];
}
