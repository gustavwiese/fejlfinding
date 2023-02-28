"use strict";
window.addEventListener("load", start);

let point = 0;
let liv = 0;

function start() {
  console.log("JavaScript kører!");

  // nulstil point og liv
  point = 0;
  liv = 3;

  startAnimationer();
  startPositioner();
  registrerClick();

  // genstart når bunden rammes
  genstartMønter();
}

function genstartMønter() {
  document.querySelector("#coin1_container").addEventListener("animationiteration", coinRestart);
  document.querySelector("#coin2_container").addEventListener("animationiteration", coinRestart);
  document.querySelector("#coin3_container").addEventListener("animationiteration", coinRestart);
}

function registrerClick() {
  document.querySelector("#coin1_container").addEventListener("click", coinClicked);
  document.querySelector("#coin2_container").addEventListener("click", coinClicked);
  document.querySelector("#coin3_container").addEventListener("click", coinClicked);
  document.querySelector("#bomb_container").addEventListener("click", bombClicked);
}

function startPositioner() {
  document.querySelector("#coin1_container").classList.add("position1");
  document.querySelector("#coin2_container").classList.add("position2");
  document.querySelector("#coin3_container").classList.add("position3");
  document.querySelector("#bomb_container").classList.add("position4");
  document.querySelector("#heart_container").classList.add("position5");
}

function startAnimationer() {
  document.querySelector("#coin1_container").classList.add("falling");
  document.querySelector("#coin2_container").classList.add("falling");
  document.querySelector("#coin3_container").classList.add("falling");
  document.querySelector("#bomb_container").classList.add("falling");
  document.querySelector("#heart_container").classList.add("falling");
}

function coinClicked() {
  console.log("Click coin");
  let coin = this;
  // Forhindr gentagne clicks
  coin.removeEventListener("click", coinClicked);

  // Stop coin container
  coin.classList.add("paused");

  // sæt forsvind-animation på coin
  coin.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: coinGone
  coin.addEventListener("animationend", coinGone);

  // Giv point
  givPoint();
}

function coinGone() {
  console.log("coin gone");
  let coin = this;
  // fjern event der bringer os herind
  coin.removeEventListener("animationend", coinGone);

  // fjern forsvind-animation
  coin.querySelector("img").classList.remove("Zoom_out");

  // fjern pause
  coin.classList.remove("paused");

  // genstart falling animation
  coinRestart.call(this);

  // gør det muligt at klikke på coin igen
  coin.addEventListener("click", coinClicked);
}

function coinRestart() {
  console.log("coin restart");
  let coin = this;

  // Sæt tilfældig position
  coin.classList.remove("position1", "position2", "position3", "position4", "position5");
  let position = Math.floor(Math.random() * 5) + 1;
  coin.classList.add("position" + position);

  // Sæt tilfældig hastighed
  coin.classList.remove("speed1", "speed2", "speed3");
  let speed = Math.floor(Math.random() * 3) + 1;
  coin.classList.add("speed" + speed);

  coin.classList.remove("falling");
  coin.offsetWidth;
  coin.classList.add("falling");
}

function bombClicked() {
  console.log("Click bomb");
  // Forhindr gentagne clicks
  document.querySelector("#bomb_container").removeEventListener("click", bombClicked);

  // Stop coin container
  document.querySelector("#bomb_container").classList.add("paused");

  // sæt forsvind-animation på coin
  document.querySelector("#bomb_sprite").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  document.querySelector("#bomb_container").addEventListener("animationend", bombGone);

  mistLiv();
}

function bombGone() {
  // fjern event der bringer os herind
  document.querySelector("#bomb_container").removeEventListener("animationend", bombGone);

  // fjern forsvind-animation
  document.querySelector("#bomb_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#bomb_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#bomb_container").classList.remove("falling");
  document.querySelector("#bomb_container").offsetWidth;
  document.querySelector("#bomb_container").classList.add("falling");

  // gør det muligt at klikke på bomb igen
  document.querySelector("#bomb_container").addEventListener("click", bombClicked);
}

function givPoint() {
  console.log("Giv point");
  point++;
  console.log("har nu " + point + " point");
  visPoint();
}

function visPoint() {
  console.log("vis point");
  document.querySelector("#coin_count").textContent = point;
}

function mistLiv() {
  console.log("mist et liv");
  visMistetLiv();
  liv--;
}

function visMistetLiv() {
  document.querySelector("#heart" + liv).classList.remove("active_heart");
  document.querySelector("#heart" + liv).classList.add("broken_heart");
}
