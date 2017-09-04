/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, scores, roundScore, dice, secondDice, gamePlaying, previoudDiceValue, maxValue;

initGame();
//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-1').innerHTML = '<em>' + dice + '</em>';

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
  dice = Math.floor(Math.random() * 6) + 1;
  secondDice = Math.floor(Math.random() * 6) + 1;
  var selector = document.querySelector('.dice');
  var selector2 = document.querySelector('.secondDice');
  selector.style.display = 'block';
  selector2.style.display = 'block';
  selector.src = "css\\dice-" + dice + ".png";
  selector2.src = "css\\dice-" + secondDice + ".png";
  if (dice ===1 || secondDice === 1) {
    nextPlayer();
  }
  else if (dice === 6)
  {
    if (previoudDiceValue === 6) {
      scores[activePlayer] = 0;
      previoudDiceValue = 0;
      nextPlayer();
    }
    else {
      previoudDiceValue === 6;
      roundScore += dice + secondDice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  }
  else {
    roundScore += dice + secondDice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }

  }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  if (scores[activePlayer] >= maxValue) {
    document.getElementById('name-' + activePlayer).textContent = 'Winner';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';
    gamePlaying = false;
  }
  else {
  nextPlayer();
  }
  }
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
});

function nextPlayer() {
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  activePlayer === 0? activePlayer = 1: activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.secondDice').style.display = 'none';
}

function initGame() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previoudDiceValue = 0;
  if (document.getElementById('input').value === "") {
    maxValue = 100;
  }
  else {
    maxValue = document.getElementById('input').value;
  }

  document.getElementById('score-0').textContent = scores[0];
  document.getElementById('current-0').textContent = roundScore
  document.getElementById('score-1').textContent = scores[1];
  document.getElementById('current-1').textContent = roundScore;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.secondDice').style.display = 'none';
}
