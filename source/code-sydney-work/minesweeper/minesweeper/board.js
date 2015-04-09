// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(max) {
  return Math.floor(Math.random() * max);
}

function Board(size, bombCount) {
  this.gridSize = size;
  this.grid = [];
  this.bombCount = bombCount;
  this.lost = false;

  this.setupGrid();
  this.generateBombs();
  return this;
}

Board.prototype.isFinished = function() {
  return this.lost || this.isWon();
}

Board.prototype.isWon = function() {
  var won = true;
  for (var row = 0; row < board.gridSize; row++) {
    for (var col = 0; col < board.gridSize; col++) {
      var cell = this.cellAtPos(row, col);
      won = won && (cell.bomb !== cell.found);
    }
  }
  return won;
}

Board.prototype.setupGrid = function(location) {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid[i] = [];
    for (var j = 0; j < this.gridSize; j++) {
      this.grid[i][j] = new Cell(i, j);
    }
  }
}

Board.prototype.generateBombs = function() {
  for(var i = 0; i < this.bombCount; i++){
    var row = this.randomPosition();
    var col = this.randomPosition();
    var cell = this.cellAtPos(row, col);
    if (cell.bomb){
      i--; // if it's already a cell, try again
    }
    cell.bomb = true;
    this.updateCellCounts(cell)
  }
}

Board.prototype.loopOverCellNeighbors = function(cell, callback) {
  for(var nearRow = (cell.row - 1); nearRow <= (cell.row + 1); nearRow++ ) {
    for(var nearCol = (cell.col - 1); nearCol <= (cell.col + 1); nearCol++ ) {
      var nearCell = this.cellAtPos(nearRow, nearCol);
      if(nearCell){
        callback(nearCell);
      }
    }
  }
}

Board.prototype.updateCellCounts = function(cell) {
  this.loopOverCellNeighbors(cell, function(nearCell){
    nearCell.count++;
  });
}

Board.prototype.revealNearCells = function(cell) {
  var self = this;
  this.loopOverCellNeighbors(cell, function(nearCell){
    if (!nearCell.bomb && !nearCell.found) {
      nearCell.find();
      if(nearCell.count === 0) {
        self.revealNearCells(nearCell);
      }
    }
  });
}

Board.prototype.revealAllCells = function() {
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0; j < this.grid.length; j++) {
      this.grid[i][j].find();
    }
  }
}

Board.prototype.makeMove = function(row, col) {
  var cell = this.cellAtPos(row, col);
  if(cell.bomb) {
    this.lost = true;
    cell.find();
  } else if(cell.count > 0) {
    cell.find();
  } else {
    this.revealNearCells(cell);
  }
}

Board.prototype.flagCell = function(row, col) {
  var cell = this.cellAtPos(row, col);
  if(cell){
    cell.flag(!cell.flagged);
  }
}

Board.prototype.randomPosition = function() {
  return getRandomArbitrary(this.gridSize);
}

Board.prototype.cellAtPos = function(row, col) {
  var full_row = this.grid[row];
  if(full_row){
    return this.grid[row][col];
  }
}
