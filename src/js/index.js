var sizeTiles = 50;
var game = new Phaser.Game(sizeTiles * 5, sizeTiles * 10, Phaser.AUTO);

var gameState = {
	preload: function() {
		game.load.image('whiteSquarre', '/src/assets/white_squarre.jpg');
		game.load.image('redSquarre', '/src/assets/red_squarre.png');
	},
	create: function() {
		this.tileWidth = '100px';
		this.tileHeight = '100px';

		this.tileGrid = [
			[1, 0, 1, 0, 1],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 1, 0],
			[0, 1, 0, 1, 0],
			[1, 0, 1, 0, 0],
			[1, 0, 0, 0, 1],
			[0, 1, 0, 0, 0],
			[0, 1, 0, 0, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0],
		];
		this.initGrid(this.tileGrid);
	},
	update: function() {},
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
				var myImage = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
				myImage.width = sizeTiles;
				myImage.height = sizeTiles;
			}
		}
	},
};

game.state.add('gameState', gameState);
game.state.start('gameState');
