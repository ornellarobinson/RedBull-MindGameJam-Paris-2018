var sizeTiles = 50;
var startArrow;
var myImage = [];
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
    game.physics.startSystem(Phaser.Physics.ARCADE);

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
    var air = game.add.sprite(75, 510, 'air');
    air.width = 35;
    air.height = 35;
    game.physics.arcade.enable(air);
    air.anchor.x = 0.5;
    air.inputEnabled = true;
    air.input.enableDrag(true);
    air.originalPosition = air.position.clone();
    air.events.onDragStop.add(function(currentSprite, pointer) {
      var line = Math.floor(currentSprite.position.y / 50);

      var column = Math.floor(currentSprite.position.x / 50);

      if (this.tileGrid[line][column] === 0)
        currentSprite.position.copyFrom({
          y: line * 50 + 10,
          x: column * 50 + 25
        });
      else currentSprite.position.copyFrom(currentSprite.originalPosition);
    }, this);

    fire = this.add.sprite(110, 510, 'fire');
    fire.width = 35;
    fire.height = 35;
    game.physics.arcade.enable(fire);
    air.anchor.x = 0.5;
    fire.inputEnabled = true;
    fire.input.enableDrag(true);
    fire.originalPosition = fire.position.clone();
    fire.events.onDragStop.add(function(currentSprite, pointer) {
      var line = Math.floor(currentSprite.position.y / 50);

      var column = Math.floor(currentSprite.position.x / 50);

      if (this.tileGrid[line][column] === 0)
        currentSprite.position.copyFrom({
          y: line * 50 + 10,
          x: column * 50 + 5
        });
      else currentSprite.position.copyFrom(currentSprite.originalPosition);
    }, this);

    water = this.add.sprite(175, 505, 'water');
    water.width = 30;
    water.height = 40;
    water.anchor.x = 0.5;
    water.inputEnabled = true;
    water.input.enableDrag(true);
    water.originalPosition = water.position.clone();
    water.events.onDragStop.add(function(currentSprite, pointer) {
      var line = Math.floor(currentSprite.position.y / 50);

      var column = Math.floor(currentSprite.position.x / 50);

      if (this.tileGrid[line][column] === 0)
        currentSprite.position.copyFrom({
          y: line * 50 + 5,
          x: column * 50 + 25
        });
      else currentSprite.position.copyFrom(currentSprite.originalPosition);
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

      if (this.tileGrid[line][column] === 0)
        currentSprite.position.copyFrom({
          y: line * 50 + 5,
          x: column * 50 + 25
        });
      else currentSprite.position.copyFrom(currentSprite.originalPosition);
    }, this);
  },
  alternateStartArrow: function() {
    if (startArrow.angle === 0) startArrow.angle = 90;
    else startArrow.angle = 0;
  },
  update: function() {},
  initGrid: function(tileGrid) {
    let count = -1;
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
        count++;
        myImage[count] = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
        myImage[count].width = sizeTiles;
        myImage[count].height = sizeTiles;
        if (tileGrid[i][j] === 0) game.physics.arcade.enable(myImage[count]);
      }
    }
  }
};

game.state.add('gameState', gameState);
game.state.start('gameState');
