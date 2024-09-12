let numSquares = 6; // Start with 6 squares
let colors = []; // Array to hold the random colors
let pickedColor; // The color that the player needs to guess
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("color-display");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

// Initialize the game
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

// Setup mode button event listeners
function setupModeButtons() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modeButtons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
      numSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  });
}

// Setup square click event listeners
function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "CORRECT";
        changeColors(clickedColor);
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323"; // Change to background color
        messageDisplay.textContent = "TRY AGAIN";
      }
    });
  });
}

// Reset the game
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";

  squares.forEach((square, index) => {
    if (colors[index]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[index];
    } else {
      square.style.display = "none"; // Hide extra squares in Easy mode
    }
  });
}

// Change all squares to the correct color
function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });
}

// Pick a random color from the array
function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Generate an array of random colors
function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

// Generate a random RGB color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Event listener for the reset button
resetButton.addEventListener("click", function () {
  reset();
});
