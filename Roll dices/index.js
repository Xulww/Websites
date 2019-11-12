var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomImg1 = "images\\dice" + randomNumber1 + ".png";
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomImg2 = "images\\dice" + randomNumber2 + ".png";

var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src", randomImg1);

var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randomImg2)

/* taka trugnah da go pravq v nachaloto koeto pak shte raboti */

// if (randomNumber1 == 1) {
//   document.querySelector(".img1").setAttribute("src", randomImg1);
// } else if (randomNumber1 == 2) {
//   document.querySelector(".img1").setAttribute("src", randomImg1);
// } else if (randomNumber1 == 3) {
//   document.querySelector(".img1").setAttribute("src", randomImg1);
// } else if (randomNumber1 == 4) {
//   document.querySelector(".img1").setAttribute("src", randomImg1);
// } else if (randomNumber1 == 5) {
//   document.querySelector(".img1").setAttribute("src", randomImg1);
// }

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!";
} else {
  document.querySelector("h1").innerHTML = "Draw!";
}
