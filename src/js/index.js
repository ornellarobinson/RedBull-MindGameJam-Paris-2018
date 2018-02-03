var sizeTiles = 50;
var arrowTop;
var arrowRight;
var game = new Phaser.Game(sizeTiles * 5, sizeTiles * 10, Phaser.AUTO);

var gameState = {
  preload: function() {
    game.load.image('whiteSquarre', '/src/assets/white_squarre.jpg');
    game.load.image('redSquarre', '/src/assets/red_squarre.png');
    game.load.image('arrowTop', '/src/assets/arrowTop.png');
    game.load.image('arrowRight', '/src/assets/arrowRight.png');
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
    arrowTop = this.add.sprite(25, 475, 'arrowTop');
    arrowTop.height = 40;
    arrowTop.width = 40;
    arrowTop.anchor.setTo(0.5, 0.5);
    arrowTop.inputEnabled = true;
    arrowTop.events.onInputDown.add(this.alternateArrowStart, this);

    //Fleche vers la droite
    arrowRight = this.add.sprite(25, 525, 'arrowRight');
    arrowRight.height = 40;
    arrowRight.width = 40;
    arrowRight.anchor.setTo(0.5, 0.5);
    arrowRight.inputEnabled = true;
    arrowRight.events.onInputDown.add(this.alternateArrowStart, this);
  },
  alternateArrowStart: function() {
    if (arrowRight.position.y !== 475) {
      arrowRight.position.y = 475;
      arrowTop.position.y = 525;
    } else {
      arrowTop.position.y = 475;
      arrowRight.position.y = 525;
    }
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
