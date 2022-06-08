'use strict';
const playerEl1 = document.getElementById('name--0');
const playerEl2 = document.getElementById('name--1');
playerEl1.textContent = prompt('Player 1 name:');
playerEl2.textContent = prompt('Player 2 name:');
let activePlayerEl = document.querySelector('.player--0');

const scoreEl1 = document.getElementById('score--0');
const scoreEl2 = document.getElementById('score--1');
const currScoreEl1 = document.getElementById('current--0');
const currScoreEl2 = document.getElementById('current--1');

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currScore, playing;
let currScoreEl = currScoreEl1;
let scoreEl = scoreEl1;
let activePlayer = 0;
const init = function () {
  scores = [0, 0];
  // activePlayer = 0;
  activePlayer = activePlayer ? 1 : 0;
  playing = true;
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  currScoreEl1.textContent = 0;
  currScoreEl2.textContent = 0;
  currScore = 0;
  // diceImg.classList.add('hidden');
  activePlayerEl.classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  currScore = 0;
  currScoreEl.textContent = currScore;
  activePlayerEl = document.querySelector(`.player--${activePlayer}`);
  activePlayerEl.classList.remove('player--active');
  activePlayer = activePlayer ? 0 : 1;
  activePlayerEl = document.querySelector(`.player--${activePlayer}`);
  currScoreEl = document.querySelector(`#current--${activePlayer}`);
  scoreEl = document.querySelector(`#score--${activePlayer}`);
  activePlayerEl.classList.add('player--active');
};
//sleep function
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
// roll dice button
let rotation = 0;
diceImg.addEventListener('click', function () {
  rotation += 360;
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    // diceImg.style.transitionDuration = '2s';
    diceImg.style.transform = `rotate(${rotation}deg)`;
    sleep(300).then(() => {
      diceImg.src = `dice-${dice}.png`;
      // diceImg.classList.remove('hidden');
    });

    // diceImg.classList.add('rotated');
    if (dice !== 1) {
      currScore += dice;
      currScoreEl.textContent = currScore;
    } else {
      sleep(700).then(() => {
        switchPlayer();
      });
    }
  }
});
// hold buttons
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currScore;
    scoreEl.textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      activePlayerEl.classList.add('player--winner');
      // diceImg.classList.add('hidden');
      playing = false;
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', init);
