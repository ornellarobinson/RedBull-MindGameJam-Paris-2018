var sizeTiles = 50;
var startArrow;
var game = new Phaser.Game(sizeTiles * 5, sizeTiles * 11, Phaser.AUTO);

var gameState = {
  preload: function() {
    game.load.image('whiteSquarre', '/src/assets/white_squarre.jpg');
    game.load.image('redSquarre', '/src/assets/red_squarre.png');
    game.load.image('startArrow', '/src/assets/arrowTop.png');
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
      [0, 0, 0, 0, 0]
    ];
    this.initGrid(this.tileGrid);
    startArrow = this.add.sprite(25, 475, 'startArrow');
    startArrow.height = 40;
    startArrow.width = 40;
    startArrow.anchor.setTo(0.5, 0.5);
    startArrow.inputEnabled = true;
    startArrow.events.onInputDown.add(this.alternateStartArrow, this);
  },
  alternateStartArrow: function() {
    if (startArrow.angle === 0) startArrow.angle = 90;
    else startArrow.angle = 0;
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
  }
};

game.state.add('gameState', gameState);
game.state.start('gameState');
