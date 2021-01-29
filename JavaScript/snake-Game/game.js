class SnakeGame {
    currentScore = 0;
    highScore = 0;
    delay = 8;

    constructor(delay) {
        this.delay = delay === undefined ? 8 : delay;
    }
}