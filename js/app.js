// Enemies object definition
var Enemy = function(x,y,speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
	this.width = 60;   		//Enemy pixel width
	this.height = 60;		//Enemy pixel height
};

// Enemy update method
Enemy.prototype.update = function(dt) {
	this.x += (this.speed * dt);
    
	//This will vary the speed for each new enemy
	var spd = speed[Math.floor(Math.random() * speed.length)];
    
	//This checks to see if enemy has moved off canvas, if so it will
	//remove it from the array and start a new enemy for that row
	if (this.x > 500) {
		var index = allEnemies.indexOf(this);
		allEnemies.splice(index, 1);
		if (this.y == row1) {
			allEnemies.push(new Enemy(startX,row1,spd));
		} else if (this.y == row2) {
			allEnemies.push(new Enemy(startX,row2,spd));
		} else {
			allEnemies.push(new Enemy(startX,row3,spd));
		}
	}
};

// Enemy Render Method
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player object definition
var Player = function(x,y) {
	this.x = x;
	this.y = y;
	this.direction = ' ';       //Direction from inputHandler
	this.distance = 15;	  //Distance per move on canvas in X direction
	this.speed = 200;     //Speed to player per move
	this.sprite = 'images/char-boy.png';
	this.width = 60;      //Player pixel width
	this.height = 60;     //Player pixel height
};

//Player update method
Player.prototype.update = function(dt) {
	// Each if statement checks which direction was pressed and
	// does initial check to make sure player is in bounds before moving
	// the player.
	if (this.direction == 'up' && this.y > -10) {
		this.y -= 83;
	}
	if (this.direction == 'down' && this.y < 405) {
		this.y += 83;
	}
	if (this.direction == 'left' && this.x > -1) {
		this.x -= 101;
	}
	if (this.direction == 'right' && this.x < 403) {
		this.x += 101;
	}
	this.direction = ' ';  //Resets direction to prevent endless moves
};

//Player render method
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player input handler from user
Player.prototype.handleInput = function(key) {
	this.direction = key; 
};

//Function for checking collisions with respect to the player
function checkCollisions(player, allEnemies) {
	//Player dimensions for current position
	var playerTop = player.y;
	var playerBottom = player.y + player.height;
	var playerLeft = player.x;
	var playerRight = player.x + player.width;
	
	//for loop used to loop through all current enemies
	for (var i=0;i<allEnemies.length;i++) {
		//Enemy dimensions for current position for each enemy in the array
		var enemyTop = allEnemies[i].y;
		var enemyBottom = allEnemies[i].y + allEnemies[i].height;
		var enemyLeft = allEnemies[i].x;
		var enemyRight = allEnemies[i].x + allEnemies[i].width;	

		//Check for collisions from all 4 sides. This looks confusing but
		//the left side of inner most '&&' checks player's 'shoulders', if either is
		//within the enemy's width, game resets. Same for player top and bottom
		//with respect to enemy's top and bottom as well.
		if (((playerLeft <= enemyRight && playerLeft > enemyLeft) ||
			(playerRight < enemyRight && playerRight >= enemyLeft)) &&
			((playerTop >= enemyTop && playerTop <= enemyBottom) ||
			(playerBottom >= enemyTop && playerBottom <= enemyBottom))) {
			//Player is reset back to starting position
			player.x = playerStartX;
			player.y = playerStartY;
			collisionMessage(true, player);
		} else {
			collisionMessage(false, player);
		}
	}
}

//Function checks if player has won the game
//A timeout is also set to allow the player character to hold
//in the victory position for 400 ms to allow the player to 
//recognize the victory. Otherwise the character is moved to the 
//starting position too quickly
function checkVictory(player) {
	if (player.y == -10) {
		victoryMessage(true, player);
		setTimeout (function() {
			player.x = playerStartX;
			player.y = playerStartY;
		}, 400);
	} else {
		victoryMessage(false, player);
	}
}

//Displays message to player indicating a collision has occurred
//Message disappears when player moves from start again
function collisionMessage(impactValue, player) {
	if (impactValue) {
		ctx.font = "50px Georgia";
		ctx.fillStyle = "red";
		ctx.fillText("Collision!!",150,48);	
	} else {
		if (player.x != playerStartX || player.y != playerStartY) {
			ctx.font = "50px Georgia";
			ctx.fillStyle = "white";
			ctx.fillText("Collision!!",150,48);
		}
	}
}

//Displays victory message for the player which disappears
//when player moves from start again
function victoryMessage(winValue, player) {
	if (winValue) {
		ctx.font = "50px Georgia";
		ctx.fillStyle = "green";
		ctx.fillText("You Win!!",150,48);
	} else {
		if (player.x != playerStartX || player.y != playerStartY) {
			ctx.font = "50px Georgia";
			ctx.fillStyle = "white";
			ctx.fillText("You Win!!",150,48);
		}
	}
}

// Supporting variables for enemies
var allEnemies = [];        //Enemy array
var startX = -110;          //Enemy  X starting point, off canvas
var speed = [80,140,175];   //Enemy speed options
var row1 = 60;
var row2 = 143;
var row3 = 226;

//Instantiate enemies on various rows and speeds
allEnemies.push(new Enemy(startX,row1,speed[0]));
allEnemies.push(new Enemy(startX,row2,speed[1]));
allEnemies.push(new Enemy(startX,row3,speed[2]));

// Instantiate player object with starting position
var playerStartX = 201;
var playerStartY = 405;
var player = new Player(playerStartX,playerStartY);

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