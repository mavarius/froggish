var UIModule = (function () {
	'use strict';

	var GameUI = function() {
		// Text Attributes
		ctx.font = '30px Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'black';

		this.score = 0;
		this.hiscore = 0;
		this.message = 'Get to the water!';
	};

	GameUI.prototype.update = function(dt) {};

	GameUI.prototype.render = function() {
		ctx.fillText(gameUI.message, canvas.width / 2, 650);
		ctx.fillText("Current Score: " + gameUI.score, canvas.width / 2, 700);
		ctx.fillText("High Score: " + gameUI.hiscore, canvas.width / 2, 750);
	};
	
	var returnVar = {
		GameUI: GameUI
	};
  
	return returnVar;

}());

var gameUI = new UIModule.GameUI();