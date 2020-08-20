var round = 0;
var move = 0;
var wrongAnswer = false;
var pattern = [];
var colors = ["green", "red", "yellow", "blue"];
var sounds = [];

$(document).keypress(function () {
    if (round === 0) {
        round++;
        wrongAnswer = false;
        $("#level-title").text("Round" + round);
        addToPattern();
        sounds.push(new Audio("sounds/green.mp3"));
        sounds.push(new Audio("sounds/yellow.mp3"));
        sounds.push(new Audio("sounds/blue.mp3"));
        sounds.push(new Audio("sounds/red.mp3"));
        glow(pattern[0]);
    }
});

$(".btn").click(function () {
    if (!wrongAnswer) {
        var temp = this;
        var sound;
        var color = "";
        $(this).addClass("pressed");
        if ($(this).attr("class").includes("green")) {
            sound = sounds[0];
            color = "green";
        } else if ($(this).attr("class").includes("yellow")) {
            sound = sounds[1];
            color = "yellow";
        } else if ($(this).attr("class").includes("blue")) {
            sound = sounds[2];
            color = "blue";
        } else {
            sound = sounds[3];
            color = "red";
        }
        setTimeout(function () {
            $(temp).removeClass("pressed");
        }, 100);
        if (color === pattern[move]) {
            sound.play();
            move++;
            if (move === pattern.length) {
                round++;
                addToPattern();
                setTimeout(function () {
                    for (i = 0; i < pattern.length; i++) {
                        glow(pattern[i]);

                    }
                    $("#level-title").text("Round" + round);
                    move = 0;
                }, 1000);
            }
        } else {
            gameOver();
            round = 0;
            move = 0;
            wrongAnswer = true;
        }
    }
});

function addToPattern() {
    pattern.push(colors[Math.floor(Math.random() * 4)]);
}

function gameOver() {
    $("body").addClass("game-over");
    $("#level-title").text("Press A Key to Start");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function glow(btn) {
    //   $("." + btn).css({ opacity: "0.5" });
    //   setTimeout(function () {
    //     $("." + btn).css({ opacity: "1" });
    //   }, 100);
    $("." + btn)
        .fadeIn(150)
        .fadeOut(150)
        .fadeIn(150);
    if (btn == "green") {
        sounds[0].play();
    } else if (btn == "yellow") {
        sounds[1].play();
    } else if (btn == "blue") {
        sounds[2].play();
    } else {
        sounds[3].play();
    }
}