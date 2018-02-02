var game = new Phaser.Game(500, 500, Phaser.AUTO);

var gameState = {
	preload: function() {},
	create: function() {},
	update: function() {},
};

game.state.add('gameState', gameState);
game.state.start('gameState');
