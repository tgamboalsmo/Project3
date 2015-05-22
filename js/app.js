// Enemies our player must avoid
var Enemy = function(x,y,speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}

// Enemy update method
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    
    //This will vary the speed for each enemy
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
}

// Enemy Render Method
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Player class definition
var Player = function(x,y) {
	this.x = x;
	this.y = y;
	this.direction;       //Direction from inputHandler
	this.distance = 40;	  //Distance to move
	this.speed = 100;     //Speed to move
	this.sprite = 'images/char-boy.png';
}

//Player update method
Player.prototype.update = function(dt) {
    // Each if statement checks which direction was pressed and
    // does initial check to make sure player is in bounds.
    // Another boundary check is performed during for loop.
   if (this.direction == 'up' && this.y > -10) {
    	for (i=0;i<this.distance;i++) {
			this.y -= this.speed * dt;
			if (this.y < -10) {
				this.y = -10;
			}
		}
		console.log(this.y);
	} 			
	if (this.direction == 'down' && this.y < 385) {
		for (i=0;i<this.distance;i++) {
			this.y += this.speed * dt;
			if (this.y > 385) {
				this.y = 385;
			}
		}
		console.log(this.y);
	} 
	if (this.direction == 'left' && this.x > 0) {
		for (i=0;i<this.distance;i++) {
			this.x -= this.speed * dt;
			if (this.x < 0) {
				this.x = 0;
			}
		}
		console.log(this.x);
	} 
	if (this.direction == 'right' && this.x < 405) {
		for (i=0;i<this.distance;i++) {
			this.x += this.speed * dt;
			if (this.x > 405) {
				this.x = 405;
			}
		}
		console.log(this.x);
	}
    this.direction = ' ';  //Resets direction to prevent endless moves
}

//Player render method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Player input handler from user
Player.prototype.handleInput = function(key) {
	this.direction = key; 
}

// Supporting variables for enemies
var allEnemies = [];        //Enemy array
var startX = -110;          //Enemy starting point, off canvas
var speed = [60,110,150];   //Enemy speed options
var row1 = 60;
var row2 = 143;
var row3 = 226;

//Instantiate enemies on various rows and speeds
allEnemies.push(new Enemy(startX,row1,speed[0]));
allEnemies.push(new Enemy(startX,row2,speed[1]));
allEnemies.push(new Enemy(startX,row3,speed[2]));

// Place object with starting position
var player = new Player(201,390);

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
