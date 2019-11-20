class LiveBarsContainer extends Phaser.GameObjects.Container {

  constructor (scene, x, y, children) {
    super(scene, x, y, children || []);
    scene.add.existing(this);
    this.max_lives = 5;
    this.current_lives = 3;
    this.Color = {
       Default: 0x888888,
       Full: 0x00FF00,
       Danger: 0xFF0000
    };
    this.createBars();
  }

  updateLive(amount) {
    var next = this.current_lives + amount;
    if (next === 0) {
      var bar = this.getAt(0);
      bar.setFillStyle(this.Color.Default);
      this.emit("ON_DEAD");
      return;
    }
    if (next < 0 || next > this.max_lives) {
      return;
    }

    this.current_lives = next;

    for (var i = this.max_lives - 1; i >= 0; i--) {
      var color = i + 1 <= this.current_lives ? this.Color.Full : this.Color.Default;
      var bar = this.getAt(i);
      if (this.current_lives === 1 && i === 0) {
        color = this.Color.Danger;
      }
      bar.setFillStyle(color);
    }
  }

  createBars() {
    var w = 50;
    var h = 10;
    var y = 0;
    var gap = 1;

    for (var i = 0; i < this.max_lives; i++) {

      var color = i + 1 <= this.current_lives ? this.Color.Full : this.Color.Default;

      //var graphics = this.scene.add.graphics(0, 0);
      var rect = new Phaser.GameObjects.Rectangle(this.scene, 0, y, w, h, color);
      this.add(rect);
      y -= h + gap;
    }
  }

}
