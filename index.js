
var started = "false";
var gameColor = ["green", "red", "yellow", "green"]
var gamePattern = [];
var userPattern = [];
var level = 0;

function play(){
    $(".heading").text("Level " + level);

    nextsequence();

    started = "true";

    $(".play").addClass("start");
    $(".play").removeAttr("onclick");
}


function nextsequence() {
    userPattern = [];

    level++;
    $("h1").text("Level " + level);

    let randomColor = Math.floor(Math.random() * 4);
    let color = gameColor[randomColor];
    gamePattern.push(color);
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

$("button").click(function () {

    var userChosenColor = this.id;
    userPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkCurrentColor(userPattern.length - 1);

});

function checkCurrentColor(currentlevel) {
    if (gamePattern[currentlevel] === userPattern[currentlevel]) {
        console.log("success");
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                nextsequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $(".heading").text("Game Over, Press Play to Restart");
        startover();
    }

}

function startover(){
    level = 0;
    started = "false";
    gamePattern = [];

    $(".play").removeClass("start");
    $(".play").attr("onclick", "play()")

}

function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio();
    audio.src = "./sounds/" + name + ".mp3"
    audio.play();
}