var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {
  preload: function() {
    this.scale.pageAlignHorizontally = true;
    this.game.load.image('hueso', '/src/assets/arrowTop.png');
    this.game.load.image('huesoCopy', '/src/assets/fire.png');

    // this.game.load.image('flecha', flechaURI);
  },
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.hueso = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.height,
      'hueso'
    );
    this.hueso.width = 40;
    this.hueso.height = 40;
    this.hueso.anchor.setTo(0.5, 1);
    this.game.physics.arcade.enable(this.hueso);
    this.hueso.tint = 0xff00ff;

    this.huesoCopy = this.game.add.sprite(200, 200, 'huesoCopy');
    this.huesoCopy.width = 40;
    this.huesoCopy.height = 40;
    this.huesoCopy.anchor.x = 0.5;
    this.game.physics.arcade.enable(this.huesoCopy);
    this.huesoCopy.inputEnabled = true;
    this.huesoCopy.input.enableDrag();
    this.huesoCopy.originalPosition = this.huesoCopy.position.clone();
    this.huesoCopy.events.onDragStop.add(function(currentSprite) {
      this.stopDrag(currentSprite, this.hueso);
    }, this);
  },
  stopDrag: function(currentSprite, endSprite) {
    if (
      !this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
        currentSprite.input.draggable = false;
        currentSprite.position.copyFrom(endSprite.position);
        currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
      })
    ) {
      currentSprite.position.copyFrom(currentSprite.originalPosition);
    }
  }
});
