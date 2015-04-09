

function Game() {
  this.missilesAvailable = 10;
  this.enemyMissilesAvailable = 5;
  this.missiles = [];
  this.enemy_missiles = [];
  this.enemy_missiles.push(new Missile(100, 200, 0, 2));
  this.explosions = [];
  this.cities = [
    new City(100, 515),
    new City(450, 575),
    new City(600, 545) ];
  this.bunkers = [
    new Bunker(30, 560),
    new Bunker(275, 525),
    new Bunker(750, 535) ];
  this.renderer = new Renderer(this);
  this.setNextBomb();
};

Game.prototype.step = function(timestamp){
  game.updateLocations();
  game.setOutOfRange();
  game.setHit();
  game.removeAllFinished();
  game.renderer.draw(game);
  game.nextFrame();
};

Game.prototype.nextFrame = function() {
  if(this.isGameRunning()){
    window.requestAnimationFrame(this.step);
  } else {
    console.log(this.endGameMessage());
  }
}

Game.prototype.endGameMessage = function() {
  if(game.isGameWon()){
    return 'Won';
  } else {
    return 'Lost';
  }
}

Game.prototype.movables = function(){
  return this.allMisiles().concat(this.explosions);
};

Game.prototype.allMisiles = function(){
  return this.missiles.concat(this.enemy_missiles);
};

Game.prototype.buildings = function(){
  return this.bunkers.concat(this.cities);
};

Game.prototype.setNextBomb = function() {
  var self = this;
  var randomTime = randomNumber(3000);
  setTimeout(function() {
    if(self.enemyMissilesAvailable > 0) {
      self.dropBomb();
    }
    if(self.enemyMissilesAvailable) {
      self.setNextBomb();
    }
  }, randomTime);
};

Game.prototype.dropBomb = function() {
  var x = randomNumber(800);
  // var speed = (randomNumber(4) + 1) / 2;
  var missile = new Missile(x, -10, 0, 0)
  missile.setFromBuilding(this.buildings());
  this.enemy_missiles.push(missile);
  this.enemyMissilesAvailable--;
};

Game.prototype.shoot = function(mousePosition) {
  var missile = new Missile(0, 0, 0, 0);
  missile.setFromClick(mousePosition, this.buildings());
  this.missiles.push(missile);
  this.missilesAvailable--;
};

Game.prototype.updateLocations = function() {
  $.each(this.movables(), function(i, movable){
    movable.move();
  });
};

Game.prototype.setOutOfRange = function() {
  var self = this;
  $.each(this.movables(), function(i, movable){
    if (movable.x > self.renderer.x || movable.y > self.renderer.y) {
      movable.alive = false;
    }
  });
};

Game.prototype.removeAllFinished = function() {
  this.explosions = this.removeDone(this.explosions);
  this.missiles = this.removeDone(this.missiles);
  this.enemy_missiles = this.removeDone(this.enemy_missiles);
  this.bunkers = this.removeDone(this.bunkers);
  this.cities = this.removeDone(this.cities);
};

Game.prototype.removeDone = function(list) {
  return $.grep(list, function( item, i ) {
    return !item.done();
  });
};

Game.prototype.setHit = function() {
  this.explosionsHitMissiles();
  this.missilesHitMissiles();
  this.missilesHitBunkers();
  this.missilesHitCities();
};

Game.prototype.explosionsHitMissiles = function() {
  var self = this;
  self.loopHits(self.explosions, self.allMisiles(), function(explosion, missile){
    self.explosions.push(new Explosion(missile.x, missile.y));
    missile.alive = false;
  });
};

Game.prototype.missilesHitMissiles = function() {
  var self = this;
  self.loopHits(self.allMisiles(), self.allMisiles(), function(missile1, missile2){
    if (missile1 !== missile2){
      self.explosions.push(new Explosion(missile1.x, missile1.y));
      missile1.alive = false;
      missile2.alive = false;
    }
  });
};

Game.prototype.missilesHitBunkers = function() {
  var self = this;
  self.loopHits(self.bunkers, self.allMisiles(), function(bunker, missile){
    bunker.alive = false;
    missile.alive = false;
  });
};

Game.prototype.missilesHitCities = function() {
  var self = this;
  self.loopHits(self.cities, self.allMisiles(), function(city, missile){
    city.alive = false;
    missile.alive = false;
  });
};

Game.prototype.loopHits = function(list1, list2, callback) {
  var self = this;
  $.each(list1, function(i, item1){
    $.each(list2, function( j, item2 ) {
      if (item1.isHit(item2)){
        callback(item1, item2)
      }
    });
  });
};

Game.prototype.isGameRunning = function(){
  return !this.isGameLost() && !this.isGameWon();
}

Game.prototype.isGameOver = function(){
  return !this.isGameRunning();
};

Game.prototype.isGameLost = function(){
  var dead_cities = 0;
  $.each(this.cities, function(i, city){
    if(!city.alive) {
      dead_cities++;
    }
  });
  return dead_cities === this.cities.length;
};

Game.prototype.isGameWon = function(){
  return this.enemy_missiles.length === 0 && this.enemyMissilesAvailable === 0;
};

var game = new Game();
game.step(0);