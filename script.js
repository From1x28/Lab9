
const CARDS_DATA = [
  { name: '6', points: 6 },
  { name: '7', points: 7 },
  { name: '8', points: 8 },
  { name: '9', points: 9 },
  { name: '10', points: 10 },
  { name: 'Валет', symbol: 'J', points: 2 },
  { name: 'Дама', symbol: 'Q', points: 3 },
  { name: 'Король', symbol: 'K', points: 4 },
  { name: 'Туз', symbol: 'A', points: 11 }
];

const SUITS = [
  { symbol: '♠', color: 'black' },
  { symbol: '♣', color: 'black' },
  { symbol: '♥', color: 'red' },
  { symbol: '♦', color: 'red' }
];

let userName = "User";
let userScore = 0;
let compScore = 0;
let currentAttempt = 0;
const maxAttempts = 3;

const userNameEl = document.getElementById('user-name');
const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const attemptCounterEl = document.getElementById('attempt-counter');
const generateBtn = document.getElementById('generate-btn');
const userCardEl = document.getElementById('user-card');
const compCardEl = document.getElementById('comp-card');
const resultMessageEl = document.getElementById('result-message');

function initGame() {
  let inputName = prompt("Введіть ваше ім'я:");
  
  if (inputName && inputName.trim() !== "") {
    userName = inputName.trim();
  }
  
  userNameEl.textContent = userName;
  updateUI();
}

function getRandomCard() {
  const cardIndex = Math.floor(Math.random() * CARDS_DATA.length);
  const suitIndex = Math.floor(Math.random() * SUITS.length);
  
  const cardInfo = CARDS_DATA[cardIndex];
  const suitInfo = SUITS[suitIndex];

  return {
    name: cardInfo.name,
    displaySymbol: cardInfo.symbol || cardInfo.name,
    points: cardInfo.points,
    suit: suitInfo.symbol,
    color: suitInfo.color
  };
}

function renderCard(element, card) {
  element.className = `card ${card.color}`;
  element.innerHTML = `
    <div class="card-top">${card.displaySymbol}${card.suit}</div>
    <div class="card-center">${card.suit}</div>
    <div class="card-bottom">${card.displaySymbol}${card.suit}</div>
  `;
}

function updateUI() {
  userScoreEl.textContent = userScore;
  compScoreEl.textContent = compScore;
  attemptCounterEl.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;
}

generateBtn.addEventListener('click', () => {
  if (currentAttempt >= maxAttempts) return;

  currentAttempt++;

  const userCard = getRandomCard();
  const compCard = getRandomCard();

  userScore += userCard.points;
  compScore += compCard.points;

  renderCard(userCardEl, userCard);
  renderCard(compCardEl, compCard);

  updateUI();

  if (currentAttempt === maxAttempts) {
    generateBtn.disabled = true;
    determineWinner();
  }
});

function determineWinner() {
  if (userScore > compScore) {
    resultMessageEl.textContent = `Переміг ${userName}! (${userScore} проти ${compScore})`;
    resultMessageEl.style.color = "#2e7d32";
  } else if (compScore > userScore) {
    resultMessageEl.textContent = `Переміг Комп'ютер! (${compScore} проти ${userScore})`;
    resultMessageEl.style.color = "#c62828";
  } else {
    resultMessageEl.textContent = `Нічия! (${userScore} : ${compScore})`;
    resultMessageEl.style.color = "#ef6c00";
  }
}

window.onload = initGame;