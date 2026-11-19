let numSquares = 6;
let colors = [];
let pickedColor;
let fiftyUsed = false;
let dominantUsed = false;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const header = document.getElementById("header");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");
const fiftyBtn = document.getElementById("fiftyBtn");
const dominantBtn = document.getElementById("dominantBtn");

init();

function init() {
  setupModeButtons();
  setupSquares();
  setupFiftyFifty();
  setupDominantHint();
  resetButton.addEventListener("click", reset);
  reset();
}

function setupModeButtons() {
  modeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      modeButtons.forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");

      const mode = this.textContent;
      if (mode === "Easy") {
        numSquares = 3;
      } else if (mode === "Hard") {
        numSquares = 6;
      } else {
        numSquares = 9;
      }

      reset();
    });
  });
}

function setupDominantHint() {
  dominantBtn.addEventListener("click", () => {
    if (dominantUsed) return;

    const [r, g, b] = pickedColor.match(/\d+/g).map(Number);
    const max = Math.max(r, g, b);
    const winners = [];

    if (r === max) winners.push("Rojo");
    if (g === max) winners.push("Verde");
    if (b === max) winners.push("Azul");

    const label = winners.length === 1
      ? `Predomina: ${winners[0]}`
      : `Empate: ${winners.join(" y ")}`;

    messageDisplay.textContent = `🎨 ${label}`;
    messageDisplay.style.color = "#7c3aed";

    dominantUsed = true;
    dominantBtn.disabled = true;
  });
}

function setupFiftyFifty() {
  fiftyBtn.addEventListener("click", () => {
    if (fiftyUsed) return;

    const activeWrongSquares = Array.from(squares).filter(
      (sq, i) =>
        colors[i] &&
        !sq.classList.contains("wrong") &&
        sq.style.backgroundColor !== pickedColor
    );

    const toRemove = Math.ceil(activeWrongSquares.length / 2);
    activeWrongSquares
      .sort(() => Math.random() - 0.5)
      .slice(0, toRemove)
      .forEach((sq) => sq.classList.add("wrong"));

    fiftyUsed = true;
    fiftyBtn.disabled = true;
    messageDisplay.textContent = "Comodín 50/50 usado";
    messageDisplay.style.color = "#059669";
  });
}

function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "¡Correcto!";
        messageDisplay.style.color = "#16a34a";
        resetButton.textContent = "¿Jugar de nuevo?";
        fiftyBtn.disabled = true;
        dominantBtn.disabled = true;
        changeColors(clickedColor);
        header.style.background = clickedColor;
      } else {
        this.classList.add("wrong");
        messageDisplay.textContent = "Intenta de nuevo";
        messageDisplay.style.color = "#dc2626";
      }
    });
  });
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor.toUpperCase();
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  header.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";

  fiftyUsed = false;
  fiftyBtn.disabled = false;

  dominantUsed = false;
  dominantBtn.disabled = false;

  squares.forEach((square, i) => {
    square.classList.remove("wrong");
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = "none";
    }
  });
}

function changeColors(color) {
  squares.forEach((square) => {
    square.classList.remove("wrong");
    square.style.backgroundColor = color;
  });
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  return Array.from({ length: num }, () => randomColor());
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}