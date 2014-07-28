function Game() {
  var direction = 'r';
  var size = 18;
  var board;
  var timer;
  var food;
  var snake;
  var me = this;

  this.init = function() {
    board = new Board('#board tbody', size);
    snake = new Snake(size);
    food = new Food(size);
    board.display();
    this.display();
    timer = setInterval(function() {
      me.moveAndDisplay();
    }, 500);
    this.bindKeys();
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

  this.display = function() {
    snake.display();
    food.display();
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
      this.endGame();
    }
  };

  this.endGame = function() {
    clearInterval(timer);
    this.displayFinal();
  };

  this.displayFinal = function() {
    console.log('You lose :(');
  };

  this.hitFood = function() {
    if(snake.hitCell(food.getLocation())) {
      snake.lengthen(this.delta());
      food.generate(size);
      return true;
    }
    return false;
  };

  return this.init();
}


$(function() {
  game = new Game();
});