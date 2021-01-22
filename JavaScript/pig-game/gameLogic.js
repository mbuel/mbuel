class DiceGame {
  currentPlayer = 0;
  winningScore = 100;
  activeFrame = document.querySelector(`.player--${this.currentPlayer}`);
  activePlayer = document.getElementById(`name--${this.currentPlayer}`);
  activeTotalScoreDom = document.getElementById(`score--${this.currentPlayer}`);
  activeCurrentScoreDom = document.getElementById(
    `current--${this.currentPlayer}`
  );

  currentScore = [0, 0];
  totalScore = [0, 0];

  dice = document.querySelector('.dice');
  btnNew = document
    .querySelector('.btn--new');
    
  btnRoll = document
    .querySelector('.btn--roll');
    
  btnHold = document
    .querySelector('.btn--hold');
    

  /**
   * constructs game logic object
   * @param {Number} winningScore score to end game - if none passed in defaults to 100
   */
  constructor(winningScore) {
    if (winningScore) this.winningScore = winningScore;
    this.btnHold.addEventListener('click', this.hold.bind(this));
    this.btnRoll.addEventListener('click', this.roll.bind(this));
    this.btnNew.addEventListener('click', this.init.bind(this));
    this.init();
    this.togglePlayer = this.togglePlayer.bind(this);
    this.setActiveFrame = this.setActiveFrame.bind(this);
    this.init = this.init.bind(this);
  }
  /**
   * sets the active frame to manipulate
   * @param {*} i
   */
  setActiveFrame(i) {
    console.log(i);
    this.activeFrame = document.querySelector(`.player--${i}`);
    this.activeTotalScoreDom = document.getElementById(`score--${i}`);
    this.activeCurrentScoreDom = document.getElementById(`current--${i}`);
    this.activePlayer = document.getElementById(`name--${i}`);
  }
  /**
   * initialize the game (also used to reset the playing field after playing)
   */
  init() {
    for (let i = 0; i < 2; i++) {
      this.setActiveFrame(i);
      this.currentScore[i] = 0;
      this.totalScore[i] = 0;
      this.currentPlayer = i;
      this.activePlayer.textContent = `PLAYER ${i + 1}`;

      this.activeFrame.classList.remove('player--active');
      this.activeFrame.classList.remove('player--winner');

      this.activeCurrentScoreDom.textContent = 0;
      this.activeTotalScoreDom.textContent = 0;
    }

    this.dice.classList.remove('hidden');
    this.btnHold.classList.remove('hidden');
    this.btnRoll.classList.remove('hidden');
    this.dice.classList.add('hidden');
    this.currentPlayer = 0; // Set back to Player 1
    this.setActiveFrame(this.currentPlayer);

    this.activeFrame.classList.toggle('player--active');

    
  }
  /**
   * toggles the active player
   */
  togglePlayer() {
    this.activeFrame.classList.toggle('player--active');
    this.activeCurrentScoreDom.textContent = 0;
    this.currentScore[this.currentPlayer] = 0;

    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
    this.setActiveFrame(this.currentPlayer);
    this.activeFrame.classList.toggle('player--active');
  }

  /**
   * rolls the dice
   */
  roll() {
    if (this.activeFrame.classList.contains('player--winner')) return;
    this.dice.classList.remove('hidden');

    let currentRoll = 0;

    this.dice.classList.toggle('dice--roll');
    let rollingInterval = setInterval(() => {
      currentRoll = Math.floor(Math.random() * 6 + 1);
      this.dice.src = `dice-${currentRoll}.png`;
    }, 50);

    setTimeout(() => {
      clearInterval(rollingInterval);
      this.dice.classList.toggle('dice--roll');
      if (currentRoll === 1) {
        // skip turn
        this.togglePlayer();
        return;
      }

      this.currentScore[this.currentPlayer] += currentRoll;
      this.activeCurrentScoreDom.innerHTML = this.currentScore[
        this.currentPlayer
      ];
    }, 800);
  }
  // Save dice roll and toggle player
  /**
   * saves the current dice roll
   */
  hold() {
    if (this.player1CurrentScore === 0 && this.player2CurrentScore === 0) {
      return;
    }

    this.totalScore[this.currentPlayer] += this.currentScore[
      this.currentPlayer
    ];
    this.activeTotalScoreDom.innerHTML = this.totalScore[this.currentPlayer];

    // Set victory
    if (this.totalScore[this.currentPlayer] >= this.winningScore) {
      this.activeFrame.classList.add('player--winner');
      this.activeFrame.classList.remove('player--active');
      this.activePlayer.textContent = '🏆 WINNER!';

      this.dice.classList.add('hidden');
      this.btnHold.classList.add('hidden');
      this.btnRoll.classList.add('hidden');
      return;
    }

    this.togglePlayer();
  }
}
