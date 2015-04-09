function Game() {
  var direction = 'r';
  var size = 32;
  var board;
  var timer;
  var food;
  var snake;
  var level = 0;
  var $level = $('#level');
  var foodTillNextLevel = 1;
  var $foodTillNextLevel = $('#food-till-next-level');
  var me = this;

  this.init = function() {
    board = new Board('#board tbody', size);
    snake = new Snake(size);
    food = new Food(size);
    board.display();
    this.display();
    this.paceMoves();
    this.bindKeys();
  };

  this.paceMoves = function() {
    clearInterval(timer);
    timer = setInterval(function() {
      me.moveAndDisplay();
    }, 50 * (5 - level));
  };

  this.bindKeys = function() {
    $(document).keydown(function(e){
      var arrowKeys = { 37 : 'l',
                        38 : 'u',
                        39 : 'r',
                        40 : 'd'};
      newDirection = arrowKeys[e.keyCode];
      if (me.oppositeDirection(newDirection) && snake.hasBody()) {
        me.endGame();
      } else {
        direction = newDirection;
      }
    });
  };

  this.displayLevelInfo = function() {
    $foodTillNextLevel.text(foodTillNextLevel);
    $level.text(level);
  }

  this.display = function() {
    snake.display();
    food.display();
    this.displayLevelInfo();
  };

  this.moveAndDisplay = function() {
    snake.move(this.delta());
    this.hitFood();
    this.checkEndGame();
    this.display();
  };

  this.changePosition = function(direction) {
    var deltas = {'r' : [1,0],
                  'l' : [-1,0],
                  'u' : [0,-1],
                  'd' : [0,1]};
    return deltas[direction];
  };

  this.oppositeDirection = function(newDirection) {
    var opposites = {
      'r': 'l',
      'l': 'r',
      'u': 'd',
      'd': 'u'
    }
    return opposites[direction] === newDirection
  };

  this.delta = function() {
    return this.changePosition(direction);
  };

  this.hitEdge = function() {
    return (snake.head()[0] > size || // hit right
            snake.head()[0] < 0    || // hit left
            snake.head()[1] > size || // hit bottom
            snake.head()[1] < 0)      // hit top
  };

  this.checkEndGame = function() {
    if (snake.hitSelf() || this.hitEdge()) {
      this.endGame(false);
    }
  };

  this.endGame = function(won) {
    clearInterval(timer);
    this.displayFinal(won);
  };

  this.displayFinal = function(won) {
    $('#board').fadeOut();
    if (won){
      $('.level-info').text('You won!');
    } else {
      $('.level-info').text('You lost');
    }
  };

  this.hitFood = function() {
    if(snake.hitCell(food.getLocation())) {
      snake.lengthen(this.delta());
      food.removeDisplay()
      food.generate(size);
      this.incrementLevel();
      return true;
    }
    return false;
  };

  this.incrementLevel = function() {
    foodTillNextLevel -=1;
    if (foodTillNextLevel === 0) {
      level += 1;
      foodTillNextLevel = level;
      this.paceMoves();
    }
    if(this.level === 4){
      this.endGame(true);
    }
  };

  return this.init();
}


$(function() {
  game = new Game();
});