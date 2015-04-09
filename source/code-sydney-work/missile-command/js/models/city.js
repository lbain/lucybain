function City(x, y) {
  this.alive = true;
  this.x = x;
  this.y = y;
  this.radius = 30;
  $.extend( this, hitable );
};
