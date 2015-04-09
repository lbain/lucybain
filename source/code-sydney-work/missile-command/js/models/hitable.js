function randomNumber(max) {
  return Math.floor(Math.random() * max);
};

var hitable = {
  isHit: function(hitable) {
    var dx = this.x - hitable.x;
    var dy = this.y - hitable.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < this.radius + hitable.radius);
  },
  done: function() {
    return !this.alive;
  }
};