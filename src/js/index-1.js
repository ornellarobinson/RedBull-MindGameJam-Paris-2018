var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {
  preload: function() {
    this.scale.pageAlignHorizontally = true;
    this.game.load.image('hueso', '/src/assets/arrowTop.png');
    this.game.load.image('fire', '/src/assets/fire.png');
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
    this.hueso.tint = 0xff0000;

    this.fire = this.game.add.sprite(300, 200, 'fire');
    this.fire.anchor.x = 0.5;
    this.game.physics.arcade.enable(this.fire);
    this.fire.width = 40;
    this.fire.height = 40;
    this.fire.inputEnabled = true;
    this.fire.input.enableDrag();
    this.fire.originalPosition = this.fire.position.clone();
    this.fire.events.onDragStop.add(function(currentSprite) {
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
