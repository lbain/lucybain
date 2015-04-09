function Board(boardLoc, size) {
  var $pageBoard;
  var squares;

  this.init = function(boardLoc, size){
    $pageBoard = $(boardLoc);

    squares = new Array(size);
    for (var i = 0; i < size; i++) {
      squares[i] = new Array(size);
    }

    return(this);
  };

  this.display = function() {
    $pageBoard.empty();
    for (var i = 0; i < squares.length; i++) {
      var row = '<tr>';
      for(var j = 0; j < squares[i].length; j++) {
        row += '<td class="square" id="'+ j + '-' + i + '"></td>';
      }
      row += '</tr>';
      $pageBoard.append(row)
    }
  };

  this.init(boardLoc, size);

};