//Array of the different buttons defined by their color
const buttonColors = ["red", "blue", "green", "yellow"];

//The level that the user is on. Also determines if the game has been started
var level = 0;

//Flag that only allows nextSequence by the user once by a keypress (until the user loses and wants to try again)
var keydownFlag = 0


//Array that stores the randomly generated sequence of buttons
var gamePattern = [];

//Array that stores the user's sequenced of clicked buttons in a round.
var userClickedPattern = [];

//When a button is clicked by the user
$(".btn").click(function() {

    //Only do something if the game has been started
    if(level !== 0) {   

        //Push clicked button onto array to compare against gamePattern array
        var userChosenColor = this.id;    
        userClickedPattern.push(userChosenColor);

        //Animate and SFX on click
        animateClick(userChosenColor);
        playSound(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
});

//When a key is pressed by user
$(document).keydown(function() {

    //Do something only if keydownFlag is 0 (So either when the game has not been started or the user failed and can restart the game)
    if(keydownFlag === 0){

        //increment keydown flag (Don't want users calling nextSequence in middle of game)
        keydownFlag += 1;

        nextSequence();
    }
})

//Function that provides button animations when they are clicked
function animateClick(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
    }, 100)
}

//Function that checks if the last clicked button still follows the randomly generated Game Pattern of buttons pressed.
function checkAnswer(currentLevel) {
    
    //Check if the last clicked button is correct according to the gamePattern array
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        //If the user has got the pattern correct for the whole gamePattern array
        if(userClickedPattern.length === gamePattern.length) {

            //Next Level
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }

    } else {

        //Reset everything (it's as if the game were never played)
        startOver();

        //play game over SFX and animations
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        //Provide game over prompt
        $("h1").html("Game Over, Press Any Key to Restart");
    }
}

//Function that is called at the beginning of the next level to add to the Game's randomly generated pattern
function nextSequence() {

    //Reset the pattern of buttons the user clicked
    userClickedPattern = [];

    //Increase the level and display the current level
    level += 1;
    $("h1").html("level " + level);

    //Generate the next button to add to the game's pattern and push it to the gamePattern array
    randomChosenColor = buttonColors[getRandomInt()];
    gamePattern.push(randomChosenColor);

    //Animate button and play its sfx so user knows what button was added to gamePattern
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//Function that gets a random int 0-3
function getRandomInt() {
    return Math.floor(Math.random() * 4);
}

//Function that plays a sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Function that is called to reset game to its default values as if the game has not been played
function startOver() {
    level = 0;
    keydownFlag = 0;
    gamePattern = [];
    userClickedPattern = [];
}
