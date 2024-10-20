var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

//game start function
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

//button fuctionality
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//game rules / functionality
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press any key to Restart");
        startOver();
    }
}

//generates random sequence
function nextSequence(){
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);

    $("#"+ randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours);
}                 

//plays the corresponding sound button
function playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//button animations
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);

}

// restart game function
function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}