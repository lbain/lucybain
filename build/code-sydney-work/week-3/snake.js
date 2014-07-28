function Snake(size) {
  var locations;

  this.init = function(size){
    locations = [[size/2, size/2]];
    return(this);
  };

  this.head = function() {
    return locations[0];
  };

  this.move = function(delta) {
    var newHead = this.head();
    if(!delta) {
      debugger
    }
    newHead = [newHead[0] + delta[0], newHead[1] + delta[1]];
    locations.unshift(newHead);
    locations.pop();
  };

  this.hitSelf = function() {
    for(var i = 1; i < locations.length; i++) {
      if(Utils.arraysEqual(this.head(), locations[i])) {
        return true
      }
    }
    return false;
  };

  this.remove = function() {
    $('.snake').text('');
  };

  this.display = function() {
    this.remove();
    for (var i = 0; i < locations.length; i++) {
      Utils.cell(locations[i]).text('O').addClass('snake')
    }
  };

  this.getLocations = function() {
    return locations;
  };

  this.lengthen = function(delta) {
    delta = [-1 * delta[0], -1 * delta[1]]
    var newSection = [this.head()[0] + delta[0], this.head()[1] + delta[1]]
    locations.push(newSection);
  };

  this.hitCell = function(cell) {
    return Utils.arraysEqual(this.head(), cell);
  }

  this.hasBody = function() {
    return locations > 1;
  }

  return this.init(size);

};