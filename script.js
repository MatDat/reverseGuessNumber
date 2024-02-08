"use strict";
let start = 1;
let end = 100;
let compGuess;

window.addEventListener("load", setup);

function setup() {
  console.log("Javascript is running!");
  compGuess = Math.floor((start + end) / 2);
  addEventListeners();
  hide();
  askName();
}

function hide() {
  document.querySelector("#greeting").classList.add("hide");
  document.querySelector("#askName").classList.add("hide");
  document.querySelector("#endGameMessage").classList.add("hide");
  document.querySelector("#btnDiv").classList.add("hide");
}

function askName() {
  const form = document.querySelector("#askName");
  form.addEventListener("submit", answeredName);
  form.classList.remove("hide");
}

//Indsætter fieldname i HTMLen via: <span data-field="firstName"></span>
function fillInFields(fieldname, value) {
  document
    .querySelectorAll(`[data-field=${fieldname}]`)
    .forEach((element) => (element.textContent = value));
}

function answeredName(event) {
  event.preventDefault();

  const form = event.target;

  form.removeEventListener("submit", answeredName);

  const firstName = form.firstName.value;
  console.log("Name of user: " + firstName);

  fillInFields("firstName", firstName);
  greeting();
  printGuess(compGuess);
}

function greeting() {
  const form = document.querySelector("#greeting");

  const askNameForm = document.querySelector("#askName");
  askNameForm.classList.add("hide");

  form.classList.remove("hide");
  makeNewGuess();
}

function makeNewGuess() {
  const form = document.querySelector("#btnDiv");
  form.classList.remove("hide");

  let prevCompGuess = compGuess;
  compGuess = Math.floor((start + end) / 2);
  if (prevCompGuess === compGuess) {
    // Player lie here
  } else {
    printGuess(compGuess);
  }
}

function addEventListeners() {
  let btnLow = document.querySelector("#btnTooLow");
  let btnHigh = document.querySelector("#btnTooHigh");
  let btnCorrect = document.querySelector("#btnCorrect");

  btnLow.addEventListener("click", guessTooLow);
  btnHigh.addEventListener("click", guessTooHigh);
  btnCorrect.addEventListener("click", guessCorrect);
}

function printGuess(guess) {
  const list = document.querySelector("#guessList");
  const listItem = document.createElement("li");
  listItem.textContent = `I'm guessing it's: ${guess}?`;
  list.appendChild(listItem);
}

function guessTooLow() {
  console.log(`Guess ${compGuess} - was too low.`);
  start = compGuess + 1;
  printGuessWithMessage(compGuess, "Too low");
  makeNewGuess();
}

function guessTooHigh() {
  console.log(`Guess ${compGuess} - was too high.`);
  end = compGuess - 1;
  printGuessWithMessage(compGuess, "Too high");
  makeNewGuess();
}

function printGuessWithMessage(guess, message) {
  const list = document.querySelector("#guessList");
  const listItem = document.createElement("li");
  listItem.textContent = `${guess}: ${message}`;
  list.appendChild(listItem);
}

function guessCorrect(li) {
  console.log("Correct clicked!");
  li.textContent = `Guessed: ${compGuess} - Which was CORRECT!! :-D`;
  const form = document.querySelector("#endGameMessage");
  form.classList.remove("hide");

  const tryAgain = document.getElementById("tryAgainBtn");
  tryAgain.addEventListener("click", function () {
    location.reload();
  });
}
