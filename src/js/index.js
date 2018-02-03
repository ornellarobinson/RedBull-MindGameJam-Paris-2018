//

var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {
  preload: function() {
    this.scale.pageAlignHorizontally = true;
    this.game.load.image('hueso', '/src/assets/arrowTop.png');
    // this.game.load.image('flecha', flechaURI);
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var hueso = game.add.sprite(100, 100, 'hueso');
    hueso.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(hueso);
    hueso.tint = 0xff00ff;
    hueso.width = 40;
    hueso.height = 40;

    var huesoCopy = game.add.sprite(
      game.world.centerX,
      0,
      hueso.key,
      hueso.frame
    );
    huesoCopy.anchor.x = 0.5;
    game.physics.arcade.enable(huesoCopy);
    huesoCopy.width = 40;
    huesoCopy.height = 40;
    huesoCopy.inputEnabled = true;
    huesoCopy.input.enableDrag();
    huesoCopy.originalPosition = huesoCopy.position.clone();
    huesoCopy.events.onDragStop.add(function(currentSprite) {
      stopDrag(currentSprite, hueso);
    }, this);

    // this.flecha = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flecha');
    // this.flecha.anchor.set(0.5);
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
