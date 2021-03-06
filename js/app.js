var GameObjects = (function () {
	'use strict';

	// Enemies our player must avoid
	var Enemy = function() {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started

		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
		this.x = -100;
		this.y = 55 + (Math.floor(Math.random() * 10) % 3) * 80;

		this.Buglocity = Math.floor(Math.random() * 300) + 200;

		// Collision Hitbox
		this.hitbox = {
			x: this.x + 10,
			y: this.y + 102,
			w: this.x + 90,
			h: this.y + 162
		};
	};

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	Enemy.prototype.update = function(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x = this.x + (this.Buglocity * dt);

		if (this.x >= 600) {
			this.x = -100;
			this.y = 55 + (Math.floor(Math.random() * 10) % 3) * 80;
			this.Buglocity = Math.floor(Math.random() * 300) + 200;
		}

		// Collision Hitbox
		this.hitbox = {
			x: this.x + 10,
			y: this.y + 102,
			w: this.x + 90,
			h: this.y + 162
		};

		// Collision Detection
		if (this.hitbox.x < player.hitbox.w &&
			this.hitbox.w > player.hitbox.x &&
			this.hitbox.y < player.hitbox.h &&
			this.hitbox.h > player.hitbox.y) {
			if (gameUI.score > gameUI.hiscore) {
				gameUI.message = 'You beat your high score!';
				gameUI.hiscore = gameUI.score;
			} else {
				gameUI.message = 'Squashed by a bug!';
			}
			gameUI.score = 0;
			player.reset();
		}
	};

	// Draw the enemy on the screen, required method for game
	Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	// Now write your own player class
	// This class requires an update(), render() and
	// a handleInput() method.
	var Player = function() {
		this.sprite = 'images/char-horn-girl.png';
		this.x = 200;
		this.y = 375;

		// Collision Hitbox
		this.hitbox = {
			x: this.x + 10,
			y: this.y + 102,
			w: this.x + 90,
			h: this.y + 162
		};

		this.win = false;
	};

	Player.prototype.update = function(dt) {
		// Collision Hitbox
		this.hitbox = {
			x: this.x + 10,
			y: this.y + 102,
			w: this.x + 90,
			h: this.y + 162
		};

		// Reset Player
		if (this.y == -25 && this.win === false) {
			this.win = true;
			var self = this;
			setTimeout(function() {
				self.reset();
			}, 500);
		}
	};

	Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	Player.prototype.handleInput = function(keypress) {
		switch (keypress) {
			case 'up':
				if (this.y > -25 && this.y != -25) {
					this.y -= 80;
				}
				break;
			case 'down':
				if (this.y < 375 && this.y != -25) {
					this.y += 80;
				}
				break;
			case 'left':
				if (this.x > 0 && this.y != -25) {
					this.x -= 101;
				}
				break;
			case 'right':
				if (this.x < 400 && this.y != -25) {
					this.x += 101;
				}
				break;
		}
	};

	Player.prototype.reset = function() {
		this.y = 375;
		this.x = 200;

		setTimeout(function() {
			gameUI.message = 'Get to the water!';
		}, 2000);

		if (this.win === true) {
			gameUI.score += 1;

			this.win = false;
		}
	};
	
	var returnVar = {
		Player: Player,
		Enemy: Enemy,
	};
	
	return returnVar;

}());

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new GameObjects.Enemy(), new GameObjects.Enemy(), new GameObjects.Enemy()];

// Place the player object in a variable called player
var player = new GameObjects.Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});