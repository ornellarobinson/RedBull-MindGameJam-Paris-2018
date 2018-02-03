var sizeTiles = 50;
var widthGame = sizeTiles * 5;
var heightGame = sizeTiles * 11;
var cell;
var laser;
var obstacleCollisionGroup;
var laserCollisionGroup;
var game = new Phaser.Game(widthGame, heightGame, Phaser.AUTO, 'mindGame');

// game.transparent = true;
//  Our core Bullet class
//  This is a simple Sprite object that we set a few properties on
//  It is fired by all of the Weapon classes

var Bullet = function(game, key) {
  Phaser.Sprite.call(this, game, 25, 0, key);

  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;

  this.tracking = false;
  this.scaleSpeed = 0;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function(x, y, angle, speed, gx, gy) {
  gx = gx || 0;
  gy = gy || 0;

  this.reset(x, y);
  this.scale.set(1);
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  this.angle = angle;
  this.body.gravity.set(gx, gy);
};

Bullet.prototype.update = function() {
  this.laser = this;

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.collideWorldBounds = true;

  if (this.tracking) {
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
  }

  if (this.scaleSpeed > 0) {
    this.scale.x += this.scaleSpeed;
    this.scale.y += this.scaleSpeed;
  }
};

var Weapon = {};

Weapon.Beam = function(game) {
  Phaser.Group.call(
    this,
    game,
    game.world,
    'Beam',
    false,
    true,
    Phaser.Physics.ARCADE
  );

  this.nextFire = 0;
  this.bulletSpeed = 1000;
  this.fireRate = 45;

  for (var i = 0; i < 64; i++) {
    this.add(new Bullet(game, 'laser'), true);
  }

  return this;
};

Weapon.Beam.prototype = Object.create(Phaser.Group.prototype);
Weapon.Beam.prototype.constructor = Weapon.Beam;

Weapon.Beam.prototype.fire = function() {
  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x = sizeTiles * 2;
  var y = heightGame;

  this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

  this.nextFire = this.game.time.time + this.fireRate;
};

var PhaserGame = function() {
  this.background = null;
  this.foreground = null;

  this.player = null;
  this.cursors = null;
  this.speed = 300;

  this.weapons = [];
  this.currentWeapon = 0;
  this.weaponName = null;
};

PhaserGame.prototype = {
  init: function() {
    this.game.renderer.renderSession.roundPixels = true;

    monGroupe = game.add.group();
    this.physics.startSystem(Phaser.Physics.ARCADE);
  },

  preload: function() {
    game.load.image('whiteSquarre', '/src/assets/white_squarre.jpg');
    game.load.image('redSquarre', '/src/assets/red_squarre.png');
    game.load.image('laser', '/src/assets/laser.png');
    game.load.image('startArrow', '/src/assets/start_arrow.png');
    game.load.image('air', '/src/assets/air.png');
    game.load.image('water', '/src/assets/water.png');
    game.load.image('fire', '/src/assets/fire.png');
    game.load.image('earth', '/src/assets/earth.png');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
    laserCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

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
      [0, 0, 0, 0, 0]
    ];

    this.initGrid(this.tileGrid);

    laser = game.add.sprite(25, 478, 'laser');
    game.physics.p2.enable(laser, false);
    // laser.body.setCircle(128);
    // laser.body.fixedRotation = true;
    laser.body.angle = 90;
    laser.body.setCollisionGroup(laserCollisionGroup);

    laser.body.collides(obstacleCollisionGroup, this.hitPanda, this);

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setShowAll();
    window.addEventListener('resize', function() {
      game.scale.refresh();
    });
    game.scale.refresh();
    //Création des 4 éléments
    air = this.add.sprite(75, 525, 'air');
    air.width = 35;
    air.height = 35;
    air.anchor.setTo(0.5, 0.5);
    air.inputEnabled = true;
    air.input.enableDrag(true);
    startArrow.events.onDragStop.add(function(currentSprite) {
      this.stopDrag(currentSprite, this.air);
    }, this);
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

    water1 = this.add.sprite(175, 525, 'water');
    water1.width = 30;
    water1.height = 40;
    water1.anchor.setTo(0.5, 0.5);

    earth2 = this.add.sprite(225, 525, 'earth');
    earth2.width = 40;
    earth2.height = 40;
    earth2.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      laser.body.y -= 1;
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
          cell = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
          cell.body.static = true;
          cell.body.setRectangle(sizeTiles, sizeTiles);
          cell.body.setCollisionGroup(obstacleCollisionGroup);

          cell.body.collides(laserCollisionGroup);
        } else {
          cell = game.add.sprite(sizeTiles * j, sizeTiles * i, image);
        }

        cell.width = sizeTiles;
        cell.height = sizeTiles;
      }
    }
  },
  hitPanda: function(body1, body2) {
    //  body1 is the space ship (as it's the body that owns the callback)
    //  body2 is the body it impacted with, in this case our panda
    //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
    console.log('ici');
  },
  render: function() {
    // game.debug.body(laser);
    // game.debug.body(obstacleCollisionGroup);
    // game.debug.body(monGroupe.children[1]);
    // game.debug.body(monGroupe.children[2]);
    // game.debug.body(monGroupe.children[3]);
    // game.debug.body(monGroupe.children[4]);
    // game.debug.body(monGroupe.children[5]);
    // game.debug.body(monGroupe.children[6]);
    // game.debug.body(monGroupe.children[7]);
    // game.debug.body(monGroupe.children[8]);
    // game.debug.body(monGroupe.children[9]);
    // game.debug.body(monGroupe.children[10]);
    // game.debug.body(monGroupe.children[11]);
    // game.debug.body(monGroupe.children[12]);
  }
};

game.state.add('Game', PhaserGame, true);
