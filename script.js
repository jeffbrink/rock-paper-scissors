const choices = ['rock', 'paper', 'scissors'];
let humanScore = 0;
let computerScore = 0;

const button = document.querySelector('button');
button.addEventListener('click', playRound);

const userInput = document.querySelector('#userInput');
userInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    button.click();
  }
});

const curRound = document.querySelector('.curRound');

function getComputerChoice() {
  const randomInt = Math.floor(Math.random() * 3);
  return choices[randomInt];
}

function getHumanChoice() {
  const userInput = document.querySelector('#userInput');
  let input = userInput.value;
  if (typeof input === 'string') {
    input = input.toLowerCase();
  }

  switch (input) {
    case '1':
    case 'rock':
    case 'r':
      return 'rock';

    case '2':
    case 'paper':
    case 'p':
      return 'paper';

    case '3':
    case 'scissors':
    case 's':
      return 'scissors';

    case 'quit':
    case 'q':
      return null;
    default:
      return null;
  }
}

function createScoreNode(textContent) {
  const p = document.createElement('p');
  p.textContent = textContent;
  curRound.appendChild(p);
}

function updateScore(humanScore, computerScore) {
  const humanScoreNode = document.querySelector('#myScore');
  const computerScoreNode = document.querySelector('#compScore');
  humanScoreNode.textContent = humanScore;
  computerScoreNode.textContent = computerScore;
}

function play() {
  const computerChoice = getComputerChoice();
  const humanChoice = getHumanChoice();

  if (humanChoice === null) {
    createScoreNode(
      'Invalid choice. Please enter a number between 1 and 3 or a valid choice (rock, paper, scissors).'
    );
    curRound.classList.remove('disabled');
    userInput.value = '';
    return;
  }

  const result =
    humanChoice === computerChoice
      ? "It's a tie!"
      : (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
      ? 'You win!'
      : 'Computer wins!';

  createScoreNode(`You chose: ${humanChoice}`);
  createScoreNode(`Computer chose: ${computerChoice}`);
  createScoreNode(result);
  curRound.classList.remove('disabled');

  if (result === 'You win!') {
    humanScore++;
  } else if (result === 'Computer wins!') {
    computerScore++;
  }

  updateScore(humanScore, computerScore);
  userInput.value = '';
}

function playRound() {
  curRound.classList.add('disabled');
  curRound.textContent = '';

  play();

  if (humanScore === 5) {
    curRound.textContent = '';
    createScoreNode('You win the game!');
    resetGame();
  } else if (computerScore === 5) {
    curRound.textContent = '';
    createScoreNode('Computer wins the game!');
    resetGame();
  }
}

function resetGame() {
  createScoreNode('Game over! Press button to play again.');
  const gameOverBtn = document.querySelector('#gameOverBtn');
  gameOverBtn.style.display = 'flex';
  gameOverBtn.addEventListener('click', function () {
    gameOverBtn.style.display = 'none';
    location.reload();
  });
  curRound.appendChild(p);
}
