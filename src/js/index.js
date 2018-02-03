var sizeTiles = 50;
var widthGame = sizeTiles * 5;
var heightGame = sizeTiles * 11;
var obstacle;
var notObstacle;
var laser;
var spaceKey;
var line;
var positionLine = [25, 475];
var lineTab = 9;
var columnTab = 4;
var game = new Phaser.Game(widthGame, heightGame, Phaser.AUTO, 'mindGame');

var gameState = {
	preload: function() {
		game.load.image('whiteSquarre', '/src/assets/white_squarre.jpg');
		game.load.image('redSquarre', '/src/assets/red_squarre.png');
		game.load.image('startArrow', '/src/assets/arrowTop.png');
		game.load.image('air', '/src/assets/air.png');
		game.load.image('water', '/src/assets/water.png');
		game.load.image('fire', '/src/assets/fire.png');
		game.load.image('earth', '/src/assets/earth.png');
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.tileGrid = [
			[1, 0, 1, 0, 1],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 1, 0],
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
			[1, 0, 0, 0, 1],
			[0, 1, 0, 0, 0],
			[0, 1, 0, 0, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0],
		];

		this.initGrid(this.tileGrid);

		air = this.add.sprite(75, 525, 'air');
		air.width = 35;
		air.height = 35;
		air.anchor.setTo(0.5, 0.5);
		air.inputEnabled = true;
		air.input.enableDrag(true);

		fire = this.add.sprite(125, 525, 'fire');
		fire.width = 35;
		fire.height = 35;
		fire.anchor.setTo(0.5, 0.5);
		fire.inputEnabled = true;
		fire.input.enableDrag(true);

		water = this.add.sprite(175, 525, 'water');
		water.width = 30;
		water.height = 40;
		water.anchor.setTo(0.5, 0.5);
		water.inputEnabled = true;
		water.input.enableDrag(true);

		earth = this.add.sprite(225, 525, 'earth');
		earth.width = 40;
		earth.height = 40;
		earth.anchor.setTo(0.5, 0.5);
		earth.inputEnabled = true;
		earth.input.enableDrag(true);

		startArrow = this.add.sprite(25, 475, 'startArrow');
		startArrow.height = 40;
		startArrow.width = 40;
		startArrow.anchor.setTo(0.5, 0.5);
		startArrow.inputEnabled = true;
		startArrow.events.onInputDown.add(this.alternateStartArrow, this);

		air = this.add.sprite(75, 525, 'air');
		air.anchor.x = 0.5;
		this.game.physics.arcade.enable(air);
		air.inputEnabled = true;

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setShowAll();
		window.addEventListener('resize', function() {
			game.scale.refresh();
		});
		game.scale.refresh();

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	},
	alternateStartArrow: function() {
		if (startArrow.angle === 0) startArrow.angle = 90;
		else startArrow.angle = 0;
	},

	alternateStartArrow: function() {
		if (startArrow.angle === 0) {
			startArrow.angle = 90;
		} else startArrow.angle = 0;
	},

	update: function() {
		if (this.spaceKey.isDown) {
			line = game.add.graphics(0, 0);
			line.lineStyle(5, 0xff0000, 1);
			if (startArrow.angle === 90) {
				while (positionLine[0] <= 300) {
					line.moveTo(positionLine[0], positionLine[1]);
					positionLine[0] += 50;
					line.lineTo(75, 475);
				}
			} else {
						while (positionLine[0] <= 300) {
							line.moveTo(positionLine[0], positionLine[1]);
							positionLine[1] -= 50;
							line.lineTo(75, 475);
			}
		}
	},

	initGrid: function(tileGrid) {
		for (let i = 0; i < tileGrid.length; i++) {
			for (let j = 0; j < tileGrid[i].length; j++) {
				var image;
				switch (tileGrid[i][j]) {
					case 1:
						image = 'redSquarre';
						break;

					default:
						image = 'whiteSquarre';
						break;
				}

				if (image === 'redSquarre') {
					var obstacle = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
					obstacle.width = sizeTiles;
					obstacle.height = sizeTiles;
				} else {
					notObstacle = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
					notObstacle.width = sizeTiles;
					notObstacle.height = sizeTiles;
				}
			}
		}
	},
};

game.state.add('Game', gameState, true);
game.state.start(gameState);
