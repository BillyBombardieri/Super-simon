let suite = [];
let suitejoueur = [];
let niveau = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function init(text) {
  alert(text);
  suite = [];
  suitejoueur = [];
  niveau = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

function AuJoueur(niveau) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${niveau} Tap${niveau > 1 ? 's' : ''}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextsuite) {
  nextsuite.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  niveau += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Mémorisez';
  heading.textContent = `Niveau ${niveau}`;


  const nextsuite = [...suite];
  nextsuite.push(nextStep());
  playRound(nextsuite);

  suite = [...nextsuite];
  setTimeout(() => {
    AuJoueur(niveau);
  }, niveau * 600 + 1000);
}

function handleClick(tile) {
  const index = suitejoueur.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = suite.length - suitejoueur.length;

  if (suitejoueur[index] !== suite[index]) {
    init('Vous avez perdu !');
    return;
  }

  if (suitejoueur.length === suite.length) {

    suitejoueur = [];
    info.textContent = 'Bravo !';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `À vous : ${remainingTaps} touche restante${
    remainingTaps > 1 ? 's' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Patientez';
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});