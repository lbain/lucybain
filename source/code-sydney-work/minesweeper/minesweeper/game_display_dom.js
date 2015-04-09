function DisplayDom(board) {
  var self = this;
  this.board = board;
  this.$board = $('#board');
  this.showBoard();

  this.$board.on("contextmenu", ".cell", function(e){
    self.rightMouseClick(event);
    return false;
  });

  this.$board.on('click', function(event){
    if($(event.target).hasClass('cell')) {
      event.preventDefault();
      if (event.which === 1){
        self.leftMouseClick(event);
      }
    }
  });

  $(document).on("displayCell", function(event){
    var $displayCell = $('.cell[row=' + event.row + '][col=' + event.col + ']')

    // remove previous found- class
    $displayCell.removeClass (function (index, css) {
        return (css.match (/(^|\s)found-\S+/g) || []).join(' ');
    });

    if(event.mark){
      $displayCell.addClass('found');
    }
    if(event.text != '') {
      $displayCell.addClass('found-'+event.text);
    }
  });
}

DisplayDom.prototype.showBoard = function() {
  for (var i = 0; i < this.board.gridSize; i++) {
    this.$board.append('<div class="row"></div>');
    var $row = this.$board.find('.row:last-child')
    for (var j = 0; j < this.board.gridSize; j++) {
      $row.append('<div class="cell" row="' + i +'" col="' + j + '">&nbsp</div>');
    }
  }
}

DisplayDom.prototype.resultDisplay = function() {
  var display = '<p class="result">';
  if(this.board.isWon()){
    display += 'You won!';
  } else {
    display += 'Sorry, you lost.';
  }
  display += '</p>';
  return display;
}

DisplayDom.prototype.checkEndGame = function(event) {
  if(this.board.isFinished()){
    this.$board.off('click');
    this.$board.off('contextmenu');
    this.$board.after(this.resultDisplay());
    this.board.revealAllCells();
  }
}

DisplayDom.prototype.rightMouseClick = function(event) {
  var position = this.posFromEvent(event)
  this.board.flagCell(position.row, position.col);
}

DisplayDom.prototype.leftMouseClick = function(event) {
  if($(event.target).hasClass('found')) {
    return;
  }
  var position = this.posFromEvent(event)
  this.board.makeMove(position.row, position.col);
  this.checkEndGame();
}

DisplayDom.prototype.posFromEvent = function(event) {
  var col = parseInt($(event.target).attr('col'))
  var row = parseInt($(event.target).attr('row'))
  return {row: row, col: col};
}