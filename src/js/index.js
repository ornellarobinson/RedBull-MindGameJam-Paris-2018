var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {
  preload: function() {
    this.scale.pageAlignHorizontally = true;
    this.game.load.image('hueso', '/src/assets/fire.png');
    this.game.load.image('huesoCopy', '/src/assets/arrowTop.png');

    // this.game.load.image('flecha', flechaURI);
  },
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    hueso = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.height,
      'hueso'
    );
    hueso.height = 40;
    hueso.width = 40;
    hueso.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(hueso);
    hueso.tint = 0xff00ff;

    huesoCopy = game.add.sprite(100, 100, 'huesoCopy');
    huesoCopy.anchor.x = 0.5;
    huesoCopy.width = 40;
    huesoCopy.height = 40;
    game.physics.arcade.enable(huesoCopy);
    huesoCopy.inputEnabled = true;
    huesoCopy.input.enableDrag();
    huesoCopy.originalPosition = huesoCopy.position.clone();
    huesoCopy.events.onDragStop.add(function(currentSprite) {
      stopDrag(currentSprite, hueso);
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
