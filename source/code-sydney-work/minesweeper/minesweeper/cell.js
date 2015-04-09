function Cell(row, col) {
  this.bomb = false;
  this.flagged = false;
  this.count = 0;
  this.found = false;
  this.row = row;
  this.col = col;
}

Cell.prototype.display = function(){
  $.event.trigger({
    type: "displayCell",
    row: this.row,
    col: this.col,
    text: this.show(),
    mark: true
  });
}

Cell.prototype.find = function(){
  this.found = true;
  this.display();
}

Cell.prototype.flag = function(flagged){
  this.flagged = flagged;
  $.event.trigger({
    type: "displayCell",
    row: this.row,
    col: this.col,
    text: (this.flagged ? 'F' : ''),
    mark: false
  });
}

// Cell.prototype.show = function() {
//   if(this.found){
//     return this.displayed() + '-found';
//   } else {
//     return this.displayed();
//   }
// }

Cell.prototype.show = function() {
  if(this.found){
    return this.displayed();
  } else {
    return '';
  }
}

Cell.prototype.displayed = function() {
  if(this.bomb){
    return 'B'
  } else if(this.flagged){
    return 'F'
  } else if(this.count) {
    return this.count;
  } else {
    return '';
  }
}