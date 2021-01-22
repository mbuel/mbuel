class Game {
  highScoreStorageKey = 'numbers-highscore';
  score = 20;
  guess = document.querySelector('.guess');
  information = document.querySelector('.message');
  myNumber = document.querySelector('.number');
  scoreDom = document.querySelector('.score');

  getHighScore = localStorage.getItem(this.highScoreStorageKey);
  highScore = document.querySelector('.highscore');
  bodyDOM = document.querySelector('body');

  guessButton = document
    .querySelector('.check')
    .addEventListener('click', this.handleGuess.bind(this));
  resetButton = document
    .querySelector('.again')
    .addEventListener('click', this.resetApplication.bind(this));
  godsNumber = 12;

  constructor() {
    this.init = this.init.bind(this);
    this.resetApplication = this.resetApplication.bind(this);
    this.handleGuess = this.handleGuess.bind(this);
    this.init();
    this.resetApplication();
  }

  init() {
    this.highScore.textContent = this.getHighScore !== 'undefined' ? this.getHighScore : 0;
  }

  resetApplication() {
    this.godsNumber = Math.ceil(Math.random() * 20);
    this.displayMessage('Start guessing...');
    this.guess.value = '';
    this.myNumber.textContent = '?';
    this.score = 20;
    this.scoreDom.textContent = this.score;
    this.bodyDOM.style.backgroundColor = '#222';
  }

  displayMessage(message) {
    this.information.textContent = message;
  }

  handleGuess() {
    
    if (!this.guess.value) {
      this.displayMessage('🛑 invalid number entered for guess! 🛑');
      return;
    }
    if (
      this.score === 0 ||
      this.information.textContent === '🏆 CONGRATULATIONS! 🏆'
    ) {
      return;
    }
    if (Number(this.score) === 1) {
      this.displayMessage('🤯 LAST TRY! 🤯');
    }

    if (Number(this.guess.value) === this.godsNumber) {
      this.bodyDOM.style.backgroundColor = '#60b347';
      this.displayMessage('🏆 CONGRATULATIONS! 🏆');
      this.myNumber.textContent = this.godsNumber;

      if (this.score > Number(this.highScore.textContent)) {
        this.highScore.textContent = this.score;
        localStorage.setItem(this.highScoreStorageKey, this.score.toString());
      }
      return;
    } 
    let messageToDisplay = (this.guess.value > this.godsNumber) ? '📈 You guessed higher than my number ' : '📉 You guessed lower than my number ';
    this.displayMessage(messageToDisplay);
    this.score--;
    this.scoreDom.textContent = this.score;

    if (this.score === 0) {
      this.displayMessage('😵 GAME OVER! 😵');
      this.bodyDOM.style.backgroundColor = '#be2222';
    }
  }
}
