const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const answerText = document.getElementById('answer');
const gifImg = document.getElementById('gifImg');
const yesCount = document.getElementById('yesCount');
const noCount = document.getElementById('noCount');
const startBtn = document.getElementById('startBtn');
const askAgainBtn = document.getElementById('askAgainBtn');
const restartBtn = document.getElementById('restartBtn');

let yesCounter = 0;
let noCounter = 0;

const fetchAnswer = async () => {
  const response = await fetch('https://yesno.wtf/api');
  const data = await response.json();
  return data;
};

const displayAnswer = async () => {
  const { answer, image } = await fetchAnswer();
  answerText.textContent = answer.toUpperCase();
  answerText.classList.remove('yes', 'no'); // Remove both classes first
  if (answer === 'yes') {
    answerText.classList.add('yes'); // Add the 'yes' class
    yesCounter++;
    yesCount.textContent = yesCounter;
  } else {
    answerText.classList.add('no'); // Add the 'no' class
    noCounter++;
    noCount.textContent = noCounter;
  }
  gifImg.src = image;
};

const showGameScreen = () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  displayAnswer();
};

const resetGame = () => {
  startScreen.style.display = 'block';
  gameScreen.style.display = 'none';
  yesCounter = 0;
  noCounter = 0;
  yesCount.textContent = '0';
  noCount.textContent = '0';
};

startBtn.addEventListener('click', showGameScreen);
askAgainBtn.addEventListener('click', displayAnswer);
restartBtn.addEventListener('click', resetGame);

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.querySelector('body');

function toggleTheme() {
  body.classList.toggle('dark-mode');
  saveThemePreference();
}

function saveThemePreference() {
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
  localStorage.setItem('togglePosition', themeToggle.checked);
}

function loadThemePreference() {
  const theme = localStorage.getItem('theme');
  const togglePosition = localStorage.getItem('togglePosition');

  if (theme === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  } else {
    body.classList.remove('dark-mode');
    themeToggle.checked = false;
  }

  if (togglePosition === 'true') {
    themeToggle.checked = true;
  } else {
    themeToggle.checked = false;
  }
}

themeToggle.addEventListener('change', toggleTheme);
window.addEventListener('load', loadThemePreference);