function Renderer(game) {
  var self = this;
  this.game = game;
  this.x = 800;
  this.y = 600;
  this.canvas = document.getElementById('canvas');
  this.canvas.addEventListener('mousedown', function(event) {
    self.shoot(event);
  }, false);
  this.context = canvas.getContext('2d');
  this.setImages();
};

Renderer.prototype.setImages = function(){
  this.missileImg = new Image();
  this.missileImg.src = 'images/missile.png';
  this.groundImg = new Image();
  this.groundImg.src = 'images/ground.png';
  this.bunkerImg = new Image();
  this.bunkerImg.src = 'images/bunker.png';
  this.cityImg = new Image();
  this.cityImg.src = 'images/city.png';
};

Renderer.prototype.draw = function(){
  this.clear();
  this.ground();
  this.missiles();
  this.bunkers();
  this.cities();
  this.explosions();
};

Renderer.prototype.clear = function(){
  // Store the current transformation matrix
  this.context.save();

  // Use the identity matrix while clearing the canvas
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  this.context.restore();
};

Renderer.prototype.shoot = function(event){
  var rect = this.canvas.getBoundingClientRect();
  var mousePosition = { x: event.clientX - rect.left,
                        y: event.clientY - rect.top }
  this.game.shoot(mousePosition)
};

Renderer.prototype.ground = function(){
  var self = this;
  self.context.save()
  var pattern = self.context.createPattern(self.groundImg, 'repeat-x');
  self.context.fillStyle = pattern;
  self.context.translate(0, 495);
  self.context.fillRect(0, 0, 800, 105);
  self.context.restore();
};

Renderer.prototype.missiles = function(){
  var self = this;
  $.each(this.game.missiles, function(i, missile){
    self.missile(missile);
  });
  $.each(this.game.enemy_missiles, function(i, missile){
    self.missile(missile);
  });
};

Renderer.prototype.missile = function(missile){
  var self = this;
  self.context.drawImage(self.missileImg, missile.x - missile.radius, missile.y - missile.radius);
};

Renderer.prototype.bunkers = function(){
  var self = this;
  $.each(this.game.bunkers, function(i, bunker){
    self.bunker(bunker);
  });
};

Renderer.prototype.bunker = function(bunker){
  this.context.drawImage(this.bunkerImg, bunker.x - bunker.radius, bunker.y - bunker.radius);
};

Renderer.prototype.cities = function(){
  var self = this;
  $.each(this.game.cities, function(i, city){
    self.city(city);
  });
};

Renderer.prototype.city = function(city){
  this.context.drawImage(this.cityImg, city.x - city.radius, city.y - city.radius);
};

Renderer.prototype.explosions = function(){
  var self = this;
  $.each(this.game.explosions, function(i, explosion){
    self.explosion(explosion);
  });
};

Renderer.prototype.explosion = function(explosion){
  this.context.beginPath();
  this.context.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI*2, true);
  this.context.closePath();
  this.context.fill();
};