let player = {};
let yBaddies = [];
let xBaddies = [];
let points = [];
let walls = [];
let end = {};
let level = 0;
let turn = 'player';

// Specifies the functions that 24a2 should call on each frame of the game
let config = {
	create     : create,
	update     : update,
	onKeyPress : onKeyPress
};

// Initializes a new game
let game = new Game(config);

// Sets the max level so we know when the game is over
let maxLevel = Object.keys(levelArr).length - 1;

// Runs once at the start of the game
function create() {
	levelTransition();
}

// Runs every frame
function update() {

	// Sets dot at player location
	game.setDot(player.x, player.y, Color.Indigo);

	// Sets dot at goal position
	game.setDot(end.x, end.y, Color.Green);

	// When player reaches goal, sets turn to player and updates level
	if (end.x === player.x && end.y === player.y) {
		turn = 'player';
		level++;
		levelTransition();
	}

	// sets the dot position for each of the dot arrays
	for (wall of walls) {
		game.setDot(wall.x, wall.y, Color.Black);
	}

	for (yBaddie of yBaddies) {
		game.setDot(yBaddie.x, yBaddie.y, Color.Red);
	}

	for (xBaddie of xBaddies) {
		game.setDot(xBaddie.x, xBaddie.y, Color.Orange);
	}

	for (point of points) {
		game.setDot(point.x, point.y, Color.Black);
	}

	// Sets the text based on whether the player is alive or not
	if (game.getDot(player.x, player.y) === Color.Red || game.getDot(player.x, player.y) === Color.Orange) {
		game.setText(`Game over! You survived to level ${level}`);
		game.end();
	} else {
		game.setText(`Level: ${level} `);
	}

	// handles enemy movement
	if (turn === 'baddie') {

		// yBaddies move up and down y-axis first until they are aligned with player
		for (yBaddie of yBaddies) {
			if (player.y > yBaddie.y && !(game.getDot(yBaddie.x, yBaddie.y + 1) === 'BLACK')) {
				yBaddie.y++;
			} else if (player.y < yBaddie.y && !(game.getDot(yBaddie.x, yBaddie.y - 1) === 'BLACK')) {
				yBaddie.y--;
			} else if(player.y === yBaddie.y){
				if (player.x > yBaddie.x && !(game.getDot(yBaddie.x + 1, yBaddie.y) === 'BLACK')) {
					yBaddie.x++;
				} else if (player.x < yBaddie.x && !(game.getDot(yBaddie.x - 1, yBaddie.y) === 'BLACK')) {
					yBaddie.x--;
				}
			}
		}

		// xBaddies move left and right on x-axis first until they are aligned with player
		for (xBaddie of xBaddies) {
			if (player.x > xBaddie.x && !(game.getDot(xBaddie.x + 1, xBaddie.y) === 'BLACK')) {
				xBaddie.x++;
			} else if (player.x < xBaddie.x && !(game.getDot(xBaddie.x - 1, xBaddie.y) === 'BLACK')) {
				xBaddie.x--;
			} else if (player.x === xBaddie.x) {
				if (player.y > xBaddie.y && !(game.getDot(xBaddie.x, xBaddie.y + 1) === 'BLACK')) {
					xBaddie.y++;
				} else if (player.y < xBaddie.y && !(game.getDot(xBaddie.x, xBaddie.y - 1) === 'BLACK')) {
					xBaddie.y--;
				}
			}
		}
		turn = 'player';
	}

	// Runs if player completes all available levels
	if (level > maxLevel) {
        game.setText(`You beat the game! Congrats!!`);
		game.end();
	}
}

// Keypresses handled using 24a2 documentation
function onKeyPress(direction) {

	// UP
	if (direction === Direction.Up && player.y > 0 && (turn === 'player' || turn === 'player2')) {
		if (!(game.getDot(player.x, player.y - 1) === 'BLACK')) {
			player.y--;
		} 
	}

	// DOWN
	if (direction === Direction.Down && player.y < 23 && (turn === 'player' || turn === 'player2')) {
		if (!(game.getDot(player.x, player.y + 1) === 'BLACK')) {
			player.y++;
		}
	}

	// LEFT
	if (direction === Direction.Left && player.x > 0 && (turn === 'player' || turn === 'player2')) {
		if (!(game.getDot(player.x - 1, player.y) === 'BLACK')) {
			player.x--;
		}
	}

	// RIGHT
	if (direction === Direction.Right && player.x < 23 && (turn === 'player' || turn === 'player2')) {
		if (!(game.getDot(player.x + 1, player.y) === 'BLACK')) {
			player.x++;
		}
	}
	
	checkTurn();
}

// Player gets 2 moves before enemy moves once
function checkTurn(){
	turn === 'player' ? turn = 'player2' : turn = 'baddie';
};

// Handles updating to next level
function levelTransition() {

	// Need to clear the old level content before loading new level
	walls = [];
	
	// Checks if game is over first
	if (!(level > maxLevel)) {

		// Fills in the walls
		for (let row = 0; row <= 23; row++) {
			for (let col = 0; col <= 23; col++) {
				wall = { x: col, y: row };
				walls.push(wall);
			}
		}

		// Removes walls to create blank spaces
		for (blank in levelArr[level].blanks) {
			walls.splice(levelArr[level].blanks[blank], 1);
		}

		// Sets remaining dots to appropriate spots
		player = levelArr[level].player;
		end = levelArr[level].end;
		yBaddies = levelArr[level].yBaddies;
		xBaddies = levelArr[level].xBaddies;
		points = levelArr[level].points;
	}
}

// Starts the game
game.run();

