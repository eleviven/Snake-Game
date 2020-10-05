class SnakeGame {
  constructor() {
    this.canvas = document.getElementById("arena");
    this.ctx = this.canvas.getContext("2d");
    document.addEventListener("keydown", this.onKeyPress.bind(this));
  }
  init() {
    this.snakeX = this.snakeY = 20;
    this.appleX = this.appleY = 5;
    this.directionX = this.directionY = 0;
    this.trail = [];
    this.tailSize = 5;
    this.gridSize = this.tileCount = 20;
    this.timer = setInterval(this.loop.bind(this), 1000 / 10);
  }
  update() {
    this.snakeX += this.directionX;
    this.snakeY += this.directionY;

    if (this.snakeX < 0) {
      this.snakeX = this.tileCount - 1;
    } else if (this.snakeX > this.tileCount - 1) {
      this.snakeX = 0;
    } else if (this.snakeY < 0) {
      this.snakeY = this.tileCount - 1;
    } else if (this.snakeY > this.tileCount - 1) {
      this.snakeY = 0;
    }

    this.trail.forEach(t => {
      if (this.snakeX == t.snakeX && this.snakeY == t.snakeY) {
        this.reset();
      }
    });

    if (this.snakeX == this.appleX && this.snakeY == this.appleY) {
      this.tailSize++;
      this.appleX = Math.floor(Math.random() * this.tileCount);
      this.appleY = Math.floor(Math.random() * this.tileCount);
    }

    this.trail.push({ snakeX: this.snakeX, snakeY: this.snakeY });

    while (this.trail.length > this.tailSize) {
      this.trail.shift();
      break;
    }
  }
  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText(this.tailSize - 5, 20, 30);

    this.ctx.fillStyle = "#ffcc00";
    this.trail.forEach(t => {
      this.ctx.fillRect(
        t.snakeX * this.gridSize,
        t.snakeY * this.gridSize,
        this.gridSize - 5,
        this.gridSize - 5
      );
    });

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.appleX * this.gridSize,
      this.appleY * this.gridSize,
      this.gridSize - 5,
      this.gridSize - 5
    );
  }
  reset() {
    clearInterval(this.timer);
    this.init();
  }
  loop() {
    this.update();
    this.draw();
  }
  onKeyPress(e) {
    if (e.keyCode == 37 && this.directionX !== 1) {
      this.directionX = -1;
      this.directionY = 0;
    } else if (e.keyCode == 38 && this.directionY !== 1) {
      this.directionX = 0;
      this.directionY = -1;
    } else if (e.keyCode == 39 && this.directionX !== -1) {
      this.directionX = 1;
      this.directionY = 0;
    } else if (e.keyCode == 40 && this.directionY !== -1) {
      this.directionX = 0;
      this.directionY = 1;
    }
  }
}

const game = new SnakeGame();
window.onload = () => game.init();
