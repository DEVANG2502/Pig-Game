'use strict';

//selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentscore, activeplayer, playing, scores;
//starting conditions
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');

  diceEL.classList.add('hidden');
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentscore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//console.log('hello');
//rolling dice funtionlity
btnRoll.addEventListener('click', function () {
  //1).generate
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2) dispaly dice
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${dice}.png`;

  //3 )check for rolled if it true switvh a next player

  if (dice !== 1) {
    //add dice to current score
    currentscore += dice;
    document.getElementById(`current--${activeplayer}`).textContent =
      currentscore;
  } else {
    switchPlayer();
    //switch player
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players score
    scores[activeplayer] += currentscore;
    // console.log(scores[activeplayer]);
    //score[1]=score[1] + currentscore;

    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //2. check if players score is >=100
    if (scores[activeplayer] >= 20) {
      //finish the game
      playing = false;
      diceEL.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //3.switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init());
