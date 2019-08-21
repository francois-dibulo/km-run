function initGame() {

  var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'phaser-container',
    backgroundColor: '#111111',
    physics: {
      // default: 'arcade',
      // arcade: { debug: false }
    },
    scene: [
      GameScene
    ]
  };

  var game = new Phaser.Game(config);
};

initGame();
