function Missile(source_x, source_y, dx, dy) {
  this.x = source_x;
  this.y = source_y
  this.radius = 5;
  this.souce_x = source_x;
  this.souce_y = source_y;
  this.dx = dx;
  this.dy = dy;
  this.alive = true;
  $.extend( this, hitable );
};

Missile.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
};

Missile.prototype.setFromBuilding = function(buildings){
  var building = this.closestBuilding(this.x, buildings);
  this.deltas(building);
};

Missile.prototype.setFromClick = function(click, buildings){
  var building = this.closestBuilding(click.x, buildings);
  this.x = building.x;
  this.y = building.y - building.radius - this.radius - 3;
  this.deltas(click);
};

Missile.prototype.closestBuilding = function(x, buildings) {
  var self = this;
  var distances = $.map(buildings, function(building, i){
    return Math.abs(building.x - x);
  });
  var buildingIndex = distances.indexOf(Math.min.apply(Math, distances))
  var building = buildings[buildingIndex]
  return building;
};

Missile.prototype.deltas = function(desintation){
  var deltaX = desintation.x - this.x;
  var deltaY = desintation.y - this.y;
  this.dx = deltaX / Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
  this.dy = deltaY / Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
  this.randomSpeed();
};

Missile.prototype.randomSpeed = function() {
  var multiplier = randomNumber(1) + 1;
  var normaliser = 2 - Math.abs(Math.abs(this.dx) - Math.abs(this.dy));
  multiplier *= normaliser;
  this.dx *= multiplier;
  this.dy *= multiplier;
};