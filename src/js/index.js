var sizeTiles = 50;
var arrowTop;
var arrowRight;
var game = new Phaser.Game(sizeTiles * 6, sizeTiles * 11, Phaser.AUTO);
var chooseArrow;

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
    // Fleche vers le haut
    startArrow = this.add.sprite(25, 475, 'startArrow');
    startArrow.height = 40;
    startArrow.width = 40;
    startArrow.anchor.setTo(0.5, 0.5);
    startArrow.inputEnabled = true;
    startArrow.events.onInputDown.add(this.alternateStartArrow, this);

    //Fleche vers la droite
    // arrowRight = this.add.sprite(25, 525, 'arrowRight');
    // arrowRight.height = 40;
    // arrowRight.width = 40;
    // arrowRight.anchor.setTo(0.5, 0.5);
    // arrowRight.inputEnabled = true;
    // arrowRight.events.onInputDown.add(this.alternatStartArrow, this);
  },
  alternateStartArrow: function() {
    // chooseArrow = chooseArrow === 'arrowTop' ? 'arrowRight' : 'arrowTop';
    if (startArrow.angle === 0) startArrow.angle = 90;
    else startArrow.angle = 0;

    // if (arrowRight.position.y !== 475) {
    //   arrowRight.position.y = 475;
    //   arrowTop.position.y = 525;
    // } else {
    //   arrowTop.position.y = 475;
    //   arrowRight.position.y = 525;
    // }
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
