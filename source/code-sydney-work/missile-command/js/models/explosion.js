function Explosion(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 20;
  this.dr = 0.5;
  this.maxR = 50;
  // TUTOR: is there a better way to do this? I was using extend, but it overwrites
  // $.extend( this, hitable );
  for (var attrname in hitable){
    if(!this[attrname]){ // look at hasOwnProperty
      this[attrname] = hitable[attrname];
    }
  }
}

Explosion.prototype.move = function() {
  this.radius += this.dr;
};

Explosion.prototype.done = function() {
  return this.radius > this.maxR;
};