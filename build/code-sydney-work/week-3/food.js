function Food(size) {
  var location;

  this.init = function(size){
    this.generate(size)
    return(this);
  };

  this.generate = function(size) {
    location = [Utils.randomNumber(size), Utils.randomNumber(size)];
  };

  this.display = function() {
    Utils.cell(location).text('F');
  };

  this.getLocation = function() {
    return location;
  }

  this.init(size);

};