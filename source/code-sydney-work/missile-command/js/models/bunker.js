function Bunker(x, y, missile_count) {
  this.alive = true;
  this.x = x;
  this.y = y;
  this.radius = 25;
  this.missile_count = missile_count;
  $.extend( this, hitable );
};
