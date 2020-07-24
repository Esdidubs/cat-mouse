let player = {};
let yBaddies = [];
let xBaddies = [];
let points = [];
let walls = [];
let score = 0;
let timeRemaining = 45;
let end = {};
let level = 0;
let turn = 'player';

const levelArr = {
	0 : {
		yBaddies : [],
		xBaddies : [],
		player   : { x: 1, y: 5 },
		end      : { x: 5, y: 1 },
		blanks   : [ 25, 25, 25, 25, 25, 44, 44, 44, 44, 44, 63, 63, 63, 63, 63, 82, 82, 82, 82, 82, 101, 101, 101, 101, 101 ],
		points   : []
	},
	1   : {
		yBaddies : [ (yBaddie = { x: 10, y: 2 }) ],
		xBaddies : [],
		player   : { x: 7, y: 5 },
		end      : { x: 11, y: 1 },
		blanks   : [ 31, 31, 31, 31, 31, 50, 50, 50, 50, 50, 69, 69, 69, 69, 69, 88, 88, 88, 88, 88, 107, 107, 107, 107, 107 ],
		points   : []
	},
	2   : {
		yBaddies : [ (yBaddie = { x: 13, y: 2 }), (yBaddie = { x: 15, y: 4 }) ],
		xBaddies : [],
		player   : { x: 12, y: 5 },
		end      : { x: 16, y: 1 },
		blanks   : [ 36, 36, 36, 36, 36, 55, 55, 55, 55, 55, 74, 74, 74, 74, 74, 93, 93, 93, 93, 93, 112, 112, 112, 112, 112 ],
		points   : []
	},
	3   : {
		yBaddies : [ (yBaddie = { x: 18, y: 3 }), (yBaddie = { x: 20, y: 4 }), (yBaddie = { x: 21, y: 2 }) ],
		xBaddies : [],
		player   : { x: 18, y: 5 },
		end      : { x: 22, y: 1 },
		blanks   : [ 42, 42, 42, 42, 42, 61, 61, 61, 61, 61, 80, 80, 80, 80, 80, 99, 99, 99, 99, 99, 118, 118, 118, 118, 118 ],
		points   : []
	},
	4   : {
		yBaddies : [ (yBaddie = { x: 1, y: 8 }), (yBaddie = { x: 2, y: 7 }), (yBaddie = { x: 4, y: 7 }), (yBaddie = { x: 5, y: 8 }) ],
		xBaddies : [],
		player   : { x: 1, y: 11 },
		end      : { x: 5, y: 7 },
		blanks   : [ 169, 169, 169, 169, 169, 188, 188, 188, 188, 188, 207, 207, 207, 207, 207, 226, 226, 226, 226, 226, 245, 245, 245, 245, 245 ],
		points   : [ (point = { x: 3, y: 7 }) ]
	},
	5   : {
		yBaddies : [ (yBaddie = { x: 10, y: 7 }), (yBaddie = { x: 11, y: 8 }) ],
		xBaddies : [],
		player   : { x: 7, y: 11 },
		end      : { x: 11, y: 7 },
		blanks   : [ 175, 175, 175, 175, 175, 194, 194, 194, 194, 194, 213, 213, 213, 213, 213, 232, 232, 232, 232, 232, 251, 251, 251, 251, 251 ],
		points   : [ (point = { x: 8, y: 9 }), (point = { x: 9, y: 10 }), (point = { x: 10, y: 9 }) ]
	},

	6   : {
		yBaddies : [
			(yBaddie = { x: 13, y: 7 }),
			(yBaddie = { x: 14, y: 8 }),
			(yBaddie = { x: 15, y: 8 }),
			(yBaddie = { x: 13, y: 9 }),
			(yBaddie = { x: 16, y: 9 }),
			(yBaddie = { x: 14, y: 10 }),
			(yBaddie = { x: 15, y: 10 }),
			(yBaddie = { x: 16, y: 11 })
		],
		xBaddies : [],
		player   : { x: 12, y: 11 },
		end      : { x: 16, y: 7 },
		blanks   : [ 180, 180, 180, 180, 180, 199, 199, 199, 199, 199, 218, 218, 218, 218, 218, 237, 237, 237, 237, 237, 256, 256, 256, 256, 256 ],
		points   : []
	},
	7   : {
		yBaddies : [],
		xBaddies : [ (xBaddie = { x: 21, y: 8 }) ],
		player   : { x: 18, y: 11 },
		end      : { x: 22, y: 7 },
		blanks   : [ 186, 186, 186, 186, 186, 205, 205, 205, 205, 205, 224, 224, 224, 224, 224, 243, 243, 243, 243, 243, 262, 262, 262, 262, 262 ],
		points   : []
	},
	8   : {
		yBaddies : [],
		xBaddies : [ (xBaddie = { x: 2, y: 13 }), (xBaddie = { x: 4, y: 15 }) ],
		player   : { x: 1, y: 16 },
		end      : { x: 5, y: 12 },
		blanks   : [ 289, 289, 289, 289, 289, 308, 308, 308, 308, 308, 327, 327, 327, 327, 327, 346, 346, 346, 346, 346, 365, 365, 365, 365, 365 ],
		points   : []
	},
	9   : {
		yBaddies : [],
		xBaddies : [ (xBaddie = { x: 8, y: 14 }), (xBaddie = { x: 9, y: 16 }), (xBaddie = { x: 10, y: 13 }) ],
		player   : { x: 7, y: 16 },
		end      : { x: 11, y: 12 },
		blanks   : [ 295, 295, 295, 295, 295, 314, 314, 314, 314, 314, 333, 333, 333, 333, 333, 352, 352, 352, 352, 352, 371, 371, 371, 371, 371 ],
		points   : []
	},
	10  : {
		yBaddies : [],
		xBaddies : [ (xBaddie = { x: 15, y: 12 }), (xBaddie = { x: 15, y: 16 }), (xBaddie = { x: 16, y: 13 }), (xBaddie = { x: 16, y: 15 }) ],
		player   : { x: 12, y: 16 },
		end      : { x: 16, y: 12 },
		blanks   : [ 300, 300, 300, 300, 300, 319, 319, 319, 319, 319, 338, 338, 338, 338, 338, 357, 357, 357, 357, 357, 376, 376, 376, 376, 376 ],
		points   : [(point = { x: 16, y: 14 })]
	},
	11  : {
		yBaddies : [],
		xBaddies : [ (xBaddie = { x: 21, y: 12 }), (xBaddie = { x: 22, y: 13 }) ],
		player   : { x: 18, y: 16 },
		end      : { x: 22, y: 12 },
		blanks   : [ 306, 306, 306, 306, 306, 325, 325, 325, 325, 325, 344, 344, 344, 344, 344, 363, 363, 363, 363, 363, 382, 382, 382, 382, 382 ],
		points   : [ (point = { x: 19, y: 14 }), (point = { x: 20, y: 13 }), (point = { x: 20, y: 15 }) ]
	},
	12  : {
		yBaddies : [],
		xBaddies : [
			(xBaddie = { x: 1, y: 18 }),
			(xBaddie = { x: 3, y: 18 }),
			(xBaddie = { x: 2, y: 19 }),
			(xBaddie = { x: 4, y: 19 }),
			(xBaddie = { x: 2, y: 20 }),
			(xBaddie = { x: 4, y: 20 }),
			(xBaddie = { x: 3, y: 21 }),
			(xBaddie = { x: 5, y: 21 })
		],
		player   : { x: 1, y: 22 },
		end      : { x: 5, y: 18 },
		blanks   : [ 433, 433, 433, 433, 433, 452, 452, 452, 452, 452, 471, 471, 471, 471, 471, 490, 490, 490, 490, 490, 509, 509, 509, 509, 509 ],
		points   : [ (point = { x: 22, y: 14 }) ]
	},

	13   : {
        yBaddies : [(yBaddie = { x: 7, y: 20 }), (yBaddie = { x: 8, y: 20 }), (yBaddie = { x: 9, y: 20 }), 
                    (yBaddie = { x: 11, y: 18 }), (yBaddie = { x: 12, y: 18 }), (yBaddie = { x: 13, y: 18 }), (yBaddie = { x: 15, y: 22 })],
		xBaddies : [(xBaddie = { x: 16, y: 18 }), (xBaddie = { x: 22, y: 19 })],
		player   : { x: 7, y: 22 },
		end      : { x: 22, y: 18 },
        blanks   : [ 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 439, 
                    447, 447, 447, 447, 447, 447, 447, 447, 447, 447, 447, 447, 447, 447, 447, 447,
                    455, 455, 455, 455, 455, 455, 455, 455, 455, 455, 455, 455, 455, 455, 455, 455,
                    463,  463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463,
                    471,  471, 471, 471, 471, 471, 471, 471, 471, 471, 471, 471, 471, 471, 471, 471,],
        points   : [ (point = { x: 15, y: 21 }), (point = { x: 15, y: 20 }), (point = { x: 15, y: 19 }), (point = { x: 15, y: 18 }),
                    (point = { x: 19, y: 21 }), (point = { x: 19, y: 20 }), (point = { x: 19, y: 19 }), (point = { x: 19, y: 22 }),
                    (point = { x: 21, y: 18 }), (point = { x: 21, y: 20 }), (point = { x: 21, y: 19 }), ]
	}
};

let maxLevel = Object.keys(levelArr).length - 1;

function create(game) {
	levelTransition();
}

function update(game) {
	// updating player location
	game.setDot(player.x, player.y, Color.Indigo);
	game.setDot(end.x, end.y, Color.Green);

	if (end.x == player.x && end.y == player.y) {
		turn = 'player';
		level++;
		levelTransition();
	}

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

	if (game.getDot(player.x, player.y) === Color.Red || game.getDot(player.x, player.y) === Color.Orange) {
		game.setText(`Game over! You survived to level ${level}`);
		game.end();
	} else {
		game.setText(`Level: ${level} `);
	}

	if (turn == 'baddie') {
		for (yBaddie of yBaddies) {
			if (player.y > yBaddie.y && !(game.getDot(yBaddie.x, yBaddie.y + 1) == 'BLACK')) {
				yBaddie.y++;
			} else if (player.y < yBaddie.y && !(game.getDot(yBaddie.x, yBaddie.y - 1) == 'BLACK')) {
				yBaddie.y--;
			} else if(player.y == yBaddie.y){
				if (player.x > yBaddie.x && !(game.getDot(yBaddie.x + 1, yBaddie.y) == 'BLACK')) {
					yBaddie.x++;
				} else if (player.x < yBaddie.x && !(game.getDot(yBaddie.x - 1, yBaddie.y) == 'BLACK')) {
					yBaddie.x--;
				}
			}
		}
		for (xBaddie of xBaddies) {
			if (player.x > xBaddie.x && !(game.getDot(xBaddie.x + 1, xBaddie.y) == 'BLACK')) {
				xBaddie.x++;
			} else if (player.x < xBaddie.x && !(game.getDot(xBaddie.x - 1, xBaddie.y) == 'BLACK')) {
				xBaddie.x--;
			} else if (player.x == xBaddie.x) {
				if (player.y > xBaddie.y && !(game.getDot(xBaddie.x, xBaddie.y + 1) == 'BLACK')) {
					xBaddie.y++;
				} else if (player.y < xBaddie.y && !(game.getDot(xBaddie.x, xBaddie.y - 1) == 'BLACK')) {
					xBaddie.y--;
				}
			}
		}
		turn = 'player';
	}
	if (level > maxLevel) {
        game.setText(`You beat the game! Congrats!!`);
		game.end();
	}
}

function onKeyPress(direction) {
	if (direction == Direction.Up && player.y > 0 && (turn == 'player' || turn == 'player2')) {
		if (!(game.getDot(player.x, player.y - 1) == 'BLACK')) {
			player.y--;
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		} else {
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		}
	}
	if (direction == Direction.Down && player.y < 23 && (turn == 'player' || turn == 'player2')) {
		if (!(game.getDot(player.x, player.y + 1) == 'BLACK')) {
			player.y++;
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		} else {
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		}
	}
	if (direction == Direction.Left && player.x > 0 && (turn == 'player' || turn == 'player2')) {
		if (!(game.getDot(player.x - 1, player.y) == 'BLACK')) {
			player.x--;
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		} else {
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		}
	}
	if (direction == Direction.Right && player.x < 23 && (turn == 'player' || turn == 'player2')) {
		if (!(game.getDot(player.x + 1, player.y) == 'BLACK')) {
			player.x++;
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		} else {
			if (turn == 'player') {
				turn = 'player2';
			} else {
				turn = 'baddie';
			}
		}
	}
}

function levelTransition() {
	walls = [];
	if (level > maxLevel) {
		game.setText(`You beat the game! Congrats!!`);
		game.end();
	} else {
		for (let row = 0; row <= 23; row++) {
			for (let col = 0; col <= 23; col++) {
				wall = { x: col, y: row };
				walls.push(wall);
			}
		}

		for (blank in levelArr[level].blanks) {
			walls.splice(levelArr[level].blanks[blank], 1);
		}

		player = levelArr[level].player;
		end = levelArr[level].end;
		yBaddies = levelArr[level].yBaddies;
		xBaddies = levelArr[level].xBaddies;
		points = levelArr[level].points;
	}

	game.setDot(player.x, player.y, Color.Indigo);
}

let config = {
	create     : create,
	update     : update,
	onKeyPress : onKeyPress
};

let game = new Game(config);
game.run();
