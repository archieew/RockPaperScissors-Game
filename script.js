function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
}

let playerScore = 0;
let computerScore = 0;

// Hand images (can be replaced with URLs to images if desired)
const handImages = {
  Rock: 'https://em-content.zobj.net/thumbs/240/apple/354/raised-fist_270a.png',
  Paper: 'https://em-content.zobj.net/thumbs/240/apple/354/raised-hand_270b.png',
  Scissors: 'https://em-content.zobj.net/thumbs/240/apple/354/victory-hand_270c.png'
};

const winnerPopup = document.getElementById('winner-popup');
const popupWinnerText = document.getElementById('popup-winner-text');
const playerHandImg = document.getElementById('player-hand-img');
const computerHandImg = document.getElementById('computer-hand-img');
const closePopupBtn = document.getElementById('close-popup');
const resetGameBtn = document.getElementById('reset-game-btn');
const optionsContainer = document.querySelector('.options-container');
const roundResultsMsg = document.getElementById('results-msg');
const playerScoreSpanElement = document.getElementById('player-score');
const computerScoreSpanElement = document.getElementById('computer-score');
const showRulesBtn = document.getElementById('show-rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeRulesBtn = document.getElementById('close-rules');

let lastPlayerChoice = null;
let lastComputerChoice = null;

function animateHand(imgElement, hand) {
  imgElement.style.opacity = 0;
  setTimeout(() => {
    imgElement.src = handImages[hand];
    imgElement.alt = hand + ' hand';
    imgElement.style.opacity = 1;
  }, 200);
}

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

function showResults(userOption) {
  const computerResult = getRandomComputerResult();
  lastPlayerChoice = userOption;
  lastComputerChoice = computerResult;

  let resultMsg = '';
  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    resultMsg = `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    resultMsg = `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    resultMsg = `Computer wins! ${computerResult} beats ${userOption}`;
  }

  roundResultsMsg.innerText = resultMsg;
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  if (playerScore === 3 || computerScore === 3) {
    const winner = playerScore === 3 ? 'Player' : 'Computer';
    showWinnerPopup(winner, lastPlayerChoice, lastComputerChoice);
    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

function showWinnerPopup(winner, playerHand, computerHand) {
  popupWinnerText.innerText = `${winner} wins the game!`;
  animateHand(playerHandImg, playerHand);
  animateHand(computerHandImg, computerHand);
  winnerPopup.style.display = 'block';
  setTimeout(() => {
    winnerPopup.classList.add('show');
  }, 10);
}

function closeWinnerPopup() {
  winnerPopup.classList.remove('show');
  setTimeout(() => {
    winnerPopup.style.display = 'none';
  }, 200);
}

closePopupBtn.addEventListener('click', closeWinnerPopup);
window.addEventListener('click', function(event) {
  if (event.target === winnerPopup) {
    closeWinnerPopup();
  }
});

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  roundResultsMsg.innerText = '';
  resetGameBtn.style.display = 'none';
  optionsContainer.style.display = 'block';
  closeWinnerPopup();
}

resetGameBtn.addEventListener("click", resetGame);

// Choice buttons
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");
rockBtn.addEventListener("click", function () { showResults("Rock"); });
paperBtn.addEventListener("click", function () { showResults("Paper"); });
scissorsBtn.addEventListener("click", function () { showResults("Scissors"); });

// Rules modal logic
showRulesBtn.addEventListener('click', function() {
  rulesModal.style.display = 'block';
  setTimeout(() => {
    rulesModal.classList.add('show');
  }, 10);
});
closeRulesBtn.addEventListener('click', function() {
  rulesModal.classList.remove('show');
  setTimeout(() => {
    rulesModal.style.display = 'none';
  }, 200);
});
window.addEventListener('click', function(event) {
  if (event.target === rulesModal) {
    rulesModal.classList.remove('show');
    setTimeout(() => {
      rulesModal.style.display = 'none';
    }, 200);
  }
});

// Add smooth fade for modals and hand images
const style = document.createElement('style');
style.innerHTML = `
  .modal.show { animation: fadeIn 0.2s; }
  .modal:not(.show) { animation: fadeOut 0.2s; }
  .hand-img { transition: opacity 0.2s; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(style);
