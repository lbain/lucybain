function Game(){var i,n,t,e,o="r",s=18,a=this;return this.init=function(){i=new Board("#board tbody",s),e=new Snake(s),t=new Food(s),i.display(),this.display(),n=setInterval(function(){a.moveAndDisplay()},500),this.bindKeys()},this.bindKeys=function(){$(document).keydown(function(i){var n={37:"l",38:"u",39:"r",40:"d"};newDirection=n[i.keyCode],a.oppositeDirection(newDirection)&&e.hasBody()?a.endGame():o=newDirection})},this.display=function(){e.display(),t.display()},this.moveAndDisplay=function(){e.move(this.delta()),this.hitFood(),this.checkEndGame(),this.display()},this.changePosition=function(i){var n={r:[1,0],l:[-1,0],u:[0,-1],d:[0,1]};return n[i]},this.oppositeDirection=function(i){var n={r:"l",l:"r",u:"d",d:"u"};return n[o]===i},this.delta=function(){return this.changePosition(o)},this.hitEdge=function(){return e.head()[0]>s||e.head()[0]<0||e.head()[1]>s||e.head()[1]<0},this.checkEndGame=function(){(e.hitSelf()||this.hitEdge())&&this.endGame()},this.endGame=function(){clearInterval(n),this.displayFinal()},this.displayFinal=function(){console.log("You lose :(")},this.hitFood=function(){return e.hitCell(t.getLocation())?(e.lengthen(this.delta()),t.generate(s),!0):!1},this.init()}$(function(){game=new Game});