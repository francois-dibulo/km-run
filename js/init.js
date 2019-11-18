function initGame() {

  var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'phaser-container',
    backgroundColor: '#F6F6F6',
    scene: [
      GameScene
    ]
  };

  var game = new Phaser.Game(config);
};

initGame();
