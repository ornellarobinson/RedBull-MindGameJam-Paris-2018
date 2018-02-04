var sizeTiles = 50;
var changeStartArrowDirection;
var arrowStart;
var myImage = [];
var arrowDirection;
var positionLine = [25, 475];
var lineTab = 9;
var columnTab = 0;
var lineDirection = 'up';
var gameOver = false;
var game = new Phaser.Game(sizeTiles * 5, sizeTiles * 11, Phaser.AUTO);

var fire = {
	id: 4,
	direction: 'up',
};

var vent = {
	id: 5,
	direction: 'right',
};

var toogleVent = {
	direction: 'right',
};

enterPortal = false;
waterProperty = 0;

var gameState = {
	preload: function() {
		game.load.image('background', '/src/assets/background.png');
		game.load.image('block', '/src/assets/rock.png');
		game.load.image('changeStartArrowDirection', '/src/assets/start.png');
		game.load.image('air', '/src/assets/air.png');
		game.load.image('water', '/src/assets/water.png');
		game.load.image('fire', '/src/assets/fire.png');
		game.load.image('earth', '/src/assets/dirt.png');
		game.load.image('whiteSquarre', '/src/assets/background.png');
		game.load.image('portal', '/src/assets/portal.png');
		game.load.image('arrival', '/src/assets/arrival.png');
	},
	create: function() {
		game.stage.backgroundColor = '#008d00';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.tileGrid = [
			[1, 0, 4, 0, 3],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 1, 1],
			[0, 2, 0, 1, 0],
			[1, 1, 0, 0, 0],
			[4, 0, 0, 0, 2],
			[0, 1, 0, 0, 0],
			[0, 1, 0, 0, 0],
			[0, 0, 1, 0, 4],
			[0, 0, 0, 0, 0],
		];

		this.initGrid(this.tileGrid);
		arrowStart = this.add.sprite(25, 475, 'changeStartArrowDirection');
		arrowStart.anchor.setTo(0.5, 0.5);
		arrowStart.width = 40;
		arrowStart.height = 40;
		changeStartArrowDirection = this.add.sprite(
			25,
			525,
			'changeStartArrowDirection',
		);
		changeStartArrowDirection.height = 40;
		changeStartArrowDirection.width = 40;
		changeStartArrowDirection.angle = 90;
		changeStartArrowDirection.anchor.setTo(0.5, 0.5);
		changeStartArrowDirection.inputEnabled = true;
		changeStartArrowDirection.events.onInputDown.add(
			this.alternatechangeStartArrowDirection,
			this,
		);
		changeStartArrowDirection.anchor.setTo(0.5, 0.5);
		changeStartArrowDirection.inputEnabled = true;

		fire = this.add.sprite(105, 505, 'fire');
		fire.width = 40;
		fire.height = 40;
		game.physics.arcade.enable(fire);
		fire.inputEnabled = true;
		fire.input.enableDrag(true);
		fire.originalPosition = fire.position.clone();
		fire.events.onDragStop.add(function(currentSprite, pointer) {
			var line = Math.floor(currentSprite.position.y / 50);

			var column = Math.floor(currentSprite.position.x / 50);

			if (this.tileGrid[line][column] === 0) {
				currentSprite.position.copyFrom({
					y: line * 50 + 10,
					x: column * 50 + 5,
				});
				this.tileGrid[line][column] = 5;
			} else currentSprite.position.copyFrom(currentSprite.originalPosition);
		}, this);

		this.air = game.add.sprite(75, 525, 'air');
		this.air.width = 40;
		this.air.height = 40;
		this.air.angle = 0;
		game.physics.arcade.enable(this.air);
		this.air.inputEnabled = true;
		this.air.anchor.setTo(0.5);
		this.air.input.enableDrag(true);
		this.air.originalPosition = this.air.position.clone();
		this.air.events.onDragStop.add(function(currentSprite, pointer) {
			var line = Math.floor(currentSprite.position.y / 50);
			var column = Math.floor(currentSprite.position.x / 50);

			if (this.tileGrid[line][column] === 0) {
				currentSprite.position.copyFrom({
					y: line * 50 + 25,
					x: column * 50 + 25,
				});
				this.tileGrid[line][column] = 6;
			} else {
				currentSprite.position.copyFrom(currentSprite.originalPosition);
				if (this.tileGrid[line][column] >= 5) this.tileGrid[line][column] = 0;
			}
		}, this);

		water = this.add.sprite(175, 505, 'water');
		water.width = 40;
		water.height = 40;
		water.anchor.x = 0.5;
		water.inputEnabled = true;
		water.input.enableDrag(true);
		water.originalPosition = water.position.clone();
		water.events.onDragStop.add(function(currentSprite, pointer) {
			var line = Math.floor(currentSprite.position.y / 50);

			var column = Math.floor(currentSprite.position.x / 50);

			if (this.tileGrid[line][column] === 0) {
				currentSprite.position.copyFrom({
					y: line * 50 + 5,
					x: column * 50 + 25,
				});
				this.tileGrid[line][column] = 7;
			} else currentSprite.position.copyFrom(currentSprite.originalPosition);
		}, this);

		earth = this.add.sprite(225, 505, 'earth');
		earth.width = 40;
		earth.height = 40;
		earth.anchor.x = 0.5;
		earth.inputEnabled = true;
		earth.input.enableDrag(true);
		earth.originalPosition = earth.position.clone();
		earth.events.onDragStop.add(function(currentSprite, pointer) {
			var line = Math.floor(currentSprite.position.y / 50);

			var column = Math.floor(currentSprite.position.x / 50);

			if (this.tileGrid[line][column] === 0) {
				currentSprite.position.copyFrom({
					y: line * 50 + 5,
					x: column * 50 + 25,
				});
				this.tileGrid[line][column] = 8;
			} else currentSprite.position.copyFrom(currentSprite.originalPosition);
		}, this);

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
		this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.a.onDown.add(this.rotateAir, this);

		game.time.events.repeat(
			Phaser.Timer.SECOND * 1,
			1000,
			this.rotateToggle,
			this,
		);
	},
	alternatechangeStartArrowDirection: function() {
		if (changeStartArrowDirection.angle === 0) {
			changeStartArrowDirection.angle = 90;
			arrowStart.angle = 0;
			lineDirection = 'up';
		} else {
			changeStartArrowDirection.angle = 0;
			arrowStart.angle = 90;
			lineDirection = 'right';
		}
	},
	rotateToggle: function() {
		if (gameOver) return;
		if (myImage[2].key === 'fire') {
			var x = myImage[2].position.x;
			var y = myImage[2].position.y;
			myImage[2] = game.add.sprite(x, y, 'air');
			myImage[2].height = sizeTiles;
			myImage[2].width = sizeTiles;
			this.tileGrid[0][2] = 6;

			var x = myImage[25].position.x;
			var y = myImage[25].position.y;
			myImage[25] = game.add.sprite(x, y, 'air');
			myImage[25].height = sizeTiles;
			myImage[25].width = sizeTiles;
			this.tileGrid[5][0] = 6;

			var x = myImage[44].position.x;
			var y = myImage[44].position.y;
			a = game.add.sprite(x, y, 'air');
			a.height = sizeTiles;
			a.width = sizeTiles;
			this.tileGrid[8][4] = 6;
		} else if (myImage[2].key === 'air') {
			var x = myImage[2].position.x;
			var y = myImage[2].position.y;
			myImage[2] = game.add.sprite(x, y, 'water');
			myImage[2].height = sizeTiles;
			myImage[2].width = sizeTiles;
			this.tileGrid[0][2] = 7;
			var x = myImage[25].position.x;
			var y = myImage[25].position.y;
			myImage[25] = game.add.sprite(x, y, 'water');
			myImage[25].height = sizeTiles;
			myImage[25].width = sizeTiles;
			this.tileGrid[5][0] = 7;

			var x = myImage[44].position.x;
			var y = myImage[44].position.y;
			myImage[44] = game.add.sprite(x, y, 'water');
			myImage[44].height = sizeTiles;
			myImage[44].width = sizeTiles;
			this.tileGrid[8][4] = 7;
		} else if (myImage[2].key === 'water') {
			var x = myImage[2].position.x;
			var y = myImage[2].position.y;
			myImage[2] = game.add.sprite(x, y, 'earth');
			myImage[2].height = sizeTiles;
			myImage[2].width = sizeTiles;
			this.tileGrid[0][2] = 8;

			var x = myImage[25].position.x;
			var y = myImage[25].position.y;
			myImage[25] = game.add.sprite(x, y, 'earth');
			myImage[25].height = sizeTiles;
			myImage[25].width = sizeTiles;
			this.tileGrid[5][0] = 8;

			var x = myImage[44].position.x;
			var y = myImage[44].position.y;
			myImage[44] = game.add.sprite(x, y, 'earth');
			myImage[44].height = sizeTiles;
			myImage[44].width = sizeTiles;
			this.tileGrid[8][4] = 8;
		} else if (myImage[2].key === 'earth') {
			var x = myImage[2].position.x;
			var y = myImage[2].position.y;
			myImage[2] = game.add.sprite(x, y, 'fire');
			myImage[2].height = sizeTiles;
			myImage[2].width = sizeTiles;
			this.tileGrid[0][2] = 5;

			var x = myImage[25].position.x;
			var y = myImage[25].position.y;
			myImage[25] = game.add.sprite(x, y, 'fire');
			myImage[25].height = sizeTiles;
			myImage[25].width = sizeTiles;
			this.tileGrid[5][0] = 5;

			var x = myImage[44].position.x;
			var y = myImage[44].position.y;
			myImage[44] = game.add.sprite(x, y, 'fire');
			myImage[44].height = sizeTiles;
			myImage[44].width = sizeTiles;
			this.tileGrid[8][4] = 5;
		}
	},
	update: function() {
		if (this.spaceKey.isDown) {
			while (!gameOver) {
				if (!enterPortal) {
					line = game.add.graphics(0, 0);
					line.lineStyle(5, '#ffff00', 1);
					line.moveTo(positionLine[0], positionLine[1]);
					this.increaseLine();
					line.lineTo(positionLine[0], positionLine[1]);
				} else {
					line2 = game.add.graphics(0, 0);
					line2.lineStyle(5, '#ffff00', 1);
					line2.moveTo(75, 175);
				}
			}
		}
	},
	rotateAir: function() {
		if (vent.direction === 'right') {
			vent.direction = 'down';
			this.air.angle = 90;
		} else if (vent.direction === 'down') {
			this.air.angle = 180;
			vent.direction = 'left';
		} else if (vent.direction === 'left') {
			this.air.angle = 270;
			vent.direction = 'up';
		} else if (vent.direction === 'up') {
			this.air.angle = 0;
			vent.direction = 'right';
		}
	},
	initGrid: function(tileGrid) {
		let count = -1;
		for (let i = 0; i < tileGrid.length; i++) {
			for (let j = 0; j < tileGrid[i].length; j++) {
				var image;
				switch (tileGrid[i][j]) {
					case 1:
						image = 'block';
						break;
					case 2:
						image = 'portal';
						break;
					case 3:
						image = 'arrival';
						break;
					case 4:
						image = 'fire';
						break;
					default:
						image = 'whiteSquarre';
						break;
				}
				count++;
				myImage[count] = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
				myImage[count].width = sizeTiles;
				myImage[count].height = sizeTiles;
				if (tileGrid[i][j] === 0) game.physics.arcade.enable(myImage[count]);
			}
		}
	},
	checkCollision: function() {
		if (lineTab < 0 || columnTab > 4 || columnTab < 0 || lineTab > 10)
			gameOver = true;
		if (this.tileGrid[lineTab][columnTab] === 1) gameOver = true;
		if (lineTab === 5 && columnTab === 4 && waterProperty === 0)
			gameOver = true;
		if (lineTab === 3 && columnTab === 1 && waterProperty === 0)
			gameOver = true;
	},
	checkElement: function() {
		var y = lineTab;
		var x = columnTab;

		if (this.tileGrid[y][x] === 2) {
			enterPortal = true;
			positionLine = [75, 175];
		}
		if (this.tileGrid[y][x] === 5) {
			lineDirection = 'diagonal';
		}
		if (this.tileGrid[y][x] === 6) {
			lineDirection = vent.direction;
			if (y === 0 && x === 2) lineDirection = toogleVent.direction;
			else if (y === 5 && x === 0) lineDirection = toogleVent.direction;
			else if (y === 8 && x === 4) lineDirection = toogleVent.direction;
		}
		if (this.tileGrid[y][x] === 7) {
			waterProperty = 1;
		}
		if (this.tileGrid[y][x] === 8) {
			//elem eart
		}
	},
	resetPoint: function() {
		line2 = game.add.graphics(0, 0);
		line2.lineStyle(5, '#ffff00', 1);
		line2.moveTo(25, 50);
		// this.incrementDiagonal();
	},
	increaseLine: function() {
		this.checkCollision();
		this.checkElement();
		if (!gameOver) {
			if (lineDirection === 'up') {
				this.incrementUp();
			} else if (lineDirection === 'right') {
				this.incrementRight();
			} else if (lineDirection === 'down') {
				this.incrementDown();
			} else if (lineDirection === 'left') {
				this.incrementLeft();
			} else if (lineDirection === 'diagonal') {
				this.incrementDiagonal();
			}
		}
	},
	incrementUp: function() {
		lineTab -= 1;
		positionLine[1] -= 50;
	},
	incrementLeft: function() {
		columnTab -= 1;
		positionLine[0] -= 50;
	},
	incrementRight: function() {
		columnTab += 1;
		positionLine[0] += 50;
	},
	incrementDown() {
		lineTab += 1;
		positionLine[1] += 50;
	},
	incrementDiagonal() {
		lineTab -= 1;
		columnTab += 1;
		positionLine[1] -= 50;
		positionLine[0] += 50;
	},
};

game.state.add('gameState', gameState);
game.state.start('gameState');
