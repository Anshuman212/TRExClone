let score = 0;
let cross = true;
//interacting with audio in js
audio = new Audio("gameaud.mp3");
audioGo = new Audio("overaud.mp3");

// //playing the audio
// setTimeout(() => {
//   audio.play();
// }, 10);
audio.play();

// checking what happens on keypress up
document.onkeydown = function (e) {
  console.log("key code is ", e.keyCode);
  if (e.keyCode === 38) {
    player = document.querySelector(".player");
    player.classList.add("animatePlayer"); // makes the dino jump
    //to remove the class when the key is pressed and animation is done
    setTimeout(() => {
      player.classList.remove("animatePlayer");
    }, 700);
  }
  // making player go right
  if (e.keyCode === 39) {
    player = document.querySelector(".player");

    playerX = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = playerX + 112 + "px";
  }
  // making player go left
  if (e.keyCode === 37) {
    player = document.querySelector(".player");

    playerX = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = playerX - 112 + "px";
  }
};

//checking for the collisions between the two
//using setIntervaL i.e we keep checking in specific interval of time
setInterval(() => {
  player = document.querySelector(".player");
  obstacle = document.querySelector(".obstacle");
  gameOver = document.querySelector(".gameOver");
  // getting the respected x and y value
  // getComputedStyle(elemnt_syle_neeeded, selector_can_blank)
  // the default is input in pixel we need to parseInt()
  px = parseInt(window.getComputedStyle(player, null).getPropertyValue("left")); //stores the current x values in px
  //getting the top value in the same way
  py = parseInt(window.getComputedStyle(player, null).getPropertyValue("top"));
  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );
  // if the proximity of the player and obstacle is under some constrain then we visible the game over style i.e game is over
  offsetX = Math.abs(ox - px);
  offsetY = Math.abs(oy - py);
  // console.log(offsetX,offsetY);
  if (offsetX < 73 && offsetY < 53) {
    //we visible the game over style
    gameOver.style.visibility = "visible";
    // then we remove the obstacle animantion
    obstacle.classList.remove("obstacleAni");
    player.classList.remove("animatePlayer");
    audioGo.play();
    audio.pause();
    //pausing the audio
    setTimeout(() => {
      audioGo.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    // but it'll just update the cross once
    // so we'll use setTimeout and make cross true after every 1 sec
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      aniDuration = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDuration - 0.8;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

const updateScore = function (score) {
  scoreCount.innerHTML = "Your Score: " + score;
};
