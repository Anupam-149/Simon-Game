var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var userLevel=0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  setTimeout(function(){
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
  },1000);

  level++;
  $("#level-title").text("LEVEL "+level);
  // console.log(gamePattern);
  // console.log(userClickedPattern);
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  if(level!=0)
  userLevel++;
  var check =1;
  if(userLevel<=level){
    for(var i=0;i<userLevel;i++){
      if(userClickedPattern[i]!=gamePattern[i]){
        $(".game-score").html("Your Score is : "+level);
        check=0;
        level=0;
        userLevel=0;
        userClickedPattern=[];
        gamePattern=[];

        $("#level-title").text("Game Over, Press Any Key to Restart.");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
         $("body").removeClass("game-over");
       },100);



        break;
      }
    }

    if(userLevel==level){
    if(check==1){
      nextSequence();
      userLevel=0;
      userClickedPattern=[];
    }
  }
}
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {

  if (level === 0) {
      $(".game-score").html("Your Score is : 0");
      nextSequence();
  }
});
