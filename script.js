"use strict";
let computerGuess;

window.addEventListener("load", setup);

function setup() {
  console.log("Javascript is running!");
  hide();
  askName();
}

function hide() {
  document.querySelector("#greeting").classList.add("hide");
  document.querySelector("#askName").classList.add("hide");
  document.querySelector("#endGameMessage").classList.add("hide");
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
}

function greeting() {
  const form = document.querySelector("#greeting");

  const askNameForm = document.querySelector("#askName");
  askNameForm.classList.add("hide");

  form.classList.remove("hide");
  makeGuess();
}

function makeGuess() {
  const guess = randomNumber();
  console.log("Guess made: " + guess);

  const list = document.querySelector("#guessList");
  const li = createListItem(guess);

  addButtonsToListItem(li);
  removeButtonsFromPreviousGuess(list);

  // Indsætter nyeste gæt i toppen af listen
  list.insertBefore(li, list.firstChild);
}

function createListItem(guess) {
  const li = document.createElement("li");
  li.textContent = `My guess is: ${guess} `;
  return li;
}

function addButtonsToListItem(li) {
  const tooLowBtn = createButton("Too low!", guessTooLow, li);
  const tooHighBtn = createButton("Too high!", guessTooHigh, li);
  const correctBtn = createButton("Correct!", guessCorrect, li);

  // Indsætter knapper på li elementet
  li.appendChild(tooLowBtn);
  li.appendChild(tooHighBtn);
  li.appendChild(correctBtn);
}

function createButton(text, clickHandler, li) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", () => clickHandler(li));
  return button;
}

function removeButtonsFromPreviousGuess(list) {
  // Fjerner knapperne fra alle gamle gæt
  if (list.firstChild) {
    const oldGuess = list.firstChild;
    oldGuess.querySelectorAll("button").forEach((button) => {
      button.removeEventListener("click", guessTooLow);
      button.removeEventListener("click", guessTooHigh);
      button.removeEventListener("click", guessCorrect);
      button.remove();
    });
  }
}

function randomNumber() {
  computerGuess = Math.floor(Math.random() * 99) + 1;
  return computerGuess;
}

function guessTooLow(li) {
  console.log("Too low was clicked!");
  li.textContent = `Guessed: ${computerGuess} - Which was too low!`;
  makeGuess();
}

function guessTooHigh(li) {
  console.log("Too high clicked!");
  li.textContent = `Guessed: ${computerGuess} - Which was too high!`;
  makeGuess();
}

function guessCorrect(li) {
  console.log("Correct clicked!");
  li.textContent = `Guessed: ${computerGuess} - Which was CORRECT!! :-D`;
  const form = document.querySelector("#endGameMessage");
  form.classList.remove("hide");

  const tryAgain = document.getElementById("tryAgainBtn");
  tryAgain.addEventListener("click", function () {
    location.reload();
  });
}
