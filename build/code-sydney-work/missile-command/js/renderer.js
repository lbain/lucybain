function Renderer(t){var e=this;this.game=t,this.x=800,this.y=600,this.canvas=document.getElementById("canvas"),this.canvas.addEventListener("mousedown",function(t){e.shoot(t)},!1),this.context=canvas.getContext("2d"),this.setImages()}Renderer.prototype.setImages=function(){this.missileImg=new Image,this.missileImg.src="images/missile.png",this.groundImg=new Image,this.groundImg.src="images/ground.png",this.bunkerImg=new Image,this.bunkerImg.src="images/bunker.png",this.cityImg=new Image,this.cityImg.src="images/city.png"},Renderer.prototype.draw=function(){this.clear(),this.ground(),this.missiles(),this.bunkers(),this.cities(),this.explosions()},Renderer.prototype.clear=function(){this.context.save(),this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,canvas.width,canvas.height),this.context.restore()},Renderer.prototype.shoot=function(t){var e=this.canvas.getBoundingClientRect(),i={x:t.clientX-e.left,y:t.clientY-e.top};this.game.shoot(i)},Renderer.prototype.ground=function(){var t=this;t.context.save();var e=t.context.createPattern(t.groundImg,"repeat-x");t.context.fillStyle=e,t.context.translate(0,495),t.context.fillRect(0,0,800,105),t.context.restore()},Renderer.prototype.missiles=function(){var t=this;$.each(this.game.missiles,function(e,i){t.missile(i)}),$.each(this.game.enemy_missiles,function(e,i){t.missile(i)})},Renderer.prototype.missile=function(t){var e=this;e.context.drawImage(e.missileImg,t.x-t.radius,t.y-t.radius)},Renderer.prototype.bunkers=function(){var t=this;$.each(this.game.bunkers,function(e,i){t.bunker(i)})},Renderer.prototype.bunker=function(t){this.context.drawImage(this.bunkerImg,t.x-t.radius,t.y-t.radius)},Renderer.prototype.cities=function(){var t=this;$.each(this.game.cities,function(e,i){t.city(i)})},Renderer.prototype.city=function(t){this.context.drawImage(this.cityImg,t.x-t.radius,t.y-t.radius)},Renderer.prototype.explosions=function(){var t=this;$.each(this.game.explosions,function(e,i){t.explosion(i)})},Renderer.prototype.explosion=function(t){this.context.beginPath(),this.context.arc(t.x,t.y,t.radius,0,2*Math.PI,!0),this.context.closePath(),this.context.fill()};