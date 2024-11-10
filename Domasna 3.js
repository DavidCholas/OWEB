const words = ["chair","piano","glass","drums","phone","viola","cello","erase","mouse","flute"];
const maxAttempts = 5;
let attempts = 0;
let selectedWord = "";
let displayedWord = [];

function startNewGame() {
  selectedWord = getRandomWord();
  displayedWord = getInitialDisplayWord(selectedWord);
  attempts = 0;
  updateDisplay();
  document.getElementById("result-popup").style.display = "none";
  document.getElementById("new-game-button").style.display = "none";
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function getInitialDisplayWord(word) {
  return word.slice(0,2).split('').concat(Array(words.length -7).fill('_'));
}

function updateDisplay() {
  document.getElementById("word-display").textContent = displayedWord.join(" ");
  document.getElementById("attempts-left").textContent = attempts;

}

function makeGuess() {
  const guess = document.getElementById("word-guess").value.toLowerCase();
  if (guess === selectedWord.toLowerCase()) {
    showResultPopup(true);
    return;
  }
  if(guess.length === 1 && guess.match(/[a-z]/)) {
    handLetterGuess(guess);
  } else {
    if(attempts < maxAttempts - 1) {
      attempts++;
    } else {
      showResultPopup(false);
      return;
    }
  }
  updateDisplay();
}

function handLetterGuess(letter) {
  if(selectedWord.includes(letter)) {
    for(let i = 0; i < selectedWord.length; i++) {
      if(selectedWord[i] === letter) {
        displayedWord[i] = letter;
      }
    }
    if(!displayedWord.includes('_')) {
      showResultPopup(true);
    }
  } else {
    attempts++;
    if(attempts >= maxAttempts) {
      showResultPopup(false);
    }
  }
  updateDisplay();
}

function showResultPopup(isSuccess) {
  const resultPopup = document.getElementById("result-popup");
  const resultMessage = document.getElementById("result-message");
  if(isSuccess) {
    resultMessage.textContent = "You guessed the word! You Win!";
  } else {
    resultMessage.textContent = "You lost, game over!";
  }
  resultPopup.style.display = "block";
  document.getElementById("new-game-button").style.display = "block";
}

startNewGame();

