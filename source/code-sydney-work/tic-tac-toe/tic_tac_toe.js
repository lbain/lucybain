Game = {
  cells: null,
  turn: 'X',
  size: null,
  $board: $('.board'),

  init: function(size) {
    Game.size = size;
    Game.cells = [];
    for (var i = 0; i < Game.size; i++) {
      Game.cells[i] = new Array(Game.size);
    }
    Game.generateBoard();
  },

  nextMove: function(col, row){
    Game.cells[col][row] = Game.turn;
    Game.makePlay();
  },

  displayBoard: function() {
    $('.cell').text('');
    for(var i = 0; i < Game.size; i++) {
      for(var j = 0; j < Game.size; j++) {
        var $cell = $('#cell-'+i+'-'+j);
        $cell.removeClass('x');
        $cell.removeClass('o');
        $cell.addClass(Game.cells[i][j]);
        $cell.text(Game.cells[i][j]);
      }
    }
  },

  generateBoard: function(){
    for(var i = 0; i < Game.size; i++){
      Game.$board.append('<div class="row"></div>');
      var $row = Game.$board.find('.row:last-child');
      for(var j = 0; j < Game.size; j++){
        $row.append("<div class='cell' id='cell-" + i + "-" + j + "' col='" + i + "' row='" + j + "'></div>");
      }
    }
  },

  makePlay: function() {
    Game.displayBoard();
    if (Game.isWon() || Game.isDraw()){
      Game.displayOutcome();
      Game.$board.off('click')
    }
    Game.turn = (Game.turn === 'X') ? 'O' : 'X';
  },

  isWon: function(){
    return (Game.columnWin() || Game.rowWin() || Game.diagonalWin());
  },

  isDraw: function() {
    var result = true;
    for(var i = 0; i < Game.size; i++){
      for(var j = 0; j < Game.size; j++){
        result = result && ((Game.cells[i][j] === 'X') || (Game.cells[i][j] === 'O'));
      }
    }
    return result;
  },

  displayOutcome: function(){
    if (Game.isWon()){
      $('#outcome h2').text(Game.turn + ' won the game!')
    } else if (Game.isDraw()) {
      $('#outcome h2').text('Draw')
    }
    // $('.board').addClass('hide')
    $('#outcome').removeClass('hide')
  },

  columnWin: function() {
    for(var i = 0; i < Game.size; i++) {
      var result = Game.cells[0][i];
      for(var j = 1; j < Game.size; j++) {
        result = result && Game.cells[0][i] === Game.cells[j][i];
      }
      if (result){
        console.log('COLUMN WIN');
        return result;
      }
    }
    return false;
  },

  rowWin: function() {
    for(var i = 0; i < Game.size; i++) {
      var result = Game.cells[i][0];
      for(var j = 1; j < Game.size; j++) {
        result = result && Game.cells[i][0] === Game.cells[i][j];
      }
      if (result){
        console.log('ROW WIN');
        return result;
      }
    }
    return false
  },

  diagonalWin: function() {
    return Game.leftDiagonalWin() || Game.rightDiagonalWin();
  },

  leftDiagonalWin: function() {
    var result = Game.cells[0][0];
    for(var i = 0; i < Game.size; i++) {
      result = result && Game.cells[0][0] === Game.cells[i][i];
    }
    if (result){
      console.log('LEFT DIAGONAL WIN')
      return result;
    }
    return false;
  },

  rightDiagonalWin: function() {
    var lastElIndex = Game.size-1;
    var result = Game.cells[0][lastElIndex];
    for(var i = 0; i < Game.size; i++) {
      result = result && Game.cells[0][lastElIndex] === Game.cells[i][lastElIndex - i];
    }
    if (result){
      console.log('RIGHT DIAGONAL WIN')
      return result;
    }
    return false;
  }
}

$(function() {
  $('input').keyup(function(event){
    $('#size-display').text($(event.target).val())
  });
  $('input[type=submit]').click(function(event){
    var size = parseInt($('#size-input').val());
    if(!size){
      return
    }
    Game.init(size);
    $('#questions').addClass('hide');
    $('.board').removeClass('hide');
  })
  // More efficent to listen to the whole board than each cell
  $('.board').on('click', function(event){
    if($(event.target).hasClass('cell')) {
      if($(event.target).text()) {
        return;
      }
      col = parseInt($(event.target).attr('col'))
      row = parseInt($(event.target).attr('row'))
      Game.nextMove(col, row)
    }
  })
});