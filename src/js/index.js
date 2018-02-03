var sizeTiles = 50;
var startArrow;
var game = new Phaser.Game(sizeTiles * 5, sizeTiles * 11, Phaser.AUTO);

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

    //Création des 4 éléments
    air = this.add.sprite(75, 525, 'air');
    air.width = 35;
    air.height = 35;
    air.anchor.setTo(0.5, 0.5);
    air.inputEnabled = true;
    air.input.enableDrag(true);
    // startArrow.events.onDragStop.add(function(currentSprite) {
    //   this.stopDrag(currentSprite, this.air);
    // }, this);
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

    air1 = this.add.sprite(75, 525, 'air');
    air1.width = 35;
    air1.height = 35;
    air1.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.air1);

    fire1 = this.add.sprite(125, 525, 'fire');
    fire1.width = 35;
    fire1.height = 35;
    fire1.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.fire1);

    water1 = this.add.sprite(175, 525, 'water');
    water1.width = 30;
    water1.height = 40;
    water1.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.water1);

    earth1 = this.add.sprite(225, 525, 'earth');
    earth1.width = 40;
    earth1.height = 40;
    earth1.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.earth1);
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
        game.physics.arcade.enable(myImage);
      }
    }
  }
};

game.state.add('gameState', gameState);
game.state.start('gameState');
