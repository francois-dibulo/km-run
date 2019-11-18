/**
 * Template class for a Rectangle Sprite
 */
class CountdownRectangle extends Phaser.GameObjects.Rectangle {

  constructor(scene, x, y, w, h, color) {
    super(scene, x, y, w, h, color);
    this.setOrigin(0, 0);
    this.size_tween = null;
    scene.add.existing(this);
  }

  start(duration) {
    this.reset();
    this.size_tween = this.scene.tweens.add({
      targets: this,
      duration: duration || 1000,
      scaleX: 0,
      onComplete: this.onCompleteTransition.bind(this)
    });
  }

  onCompleteTransition() {
    this.emit("DONE");
  }

  pause() {
    if (this.size_tween) {
      this.size_tween.stop();
    }
  }

  reset() {
    this.pause();
    this.setScale(1);
  }

  revive(x, y, w, h, color) {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    if (w) {
      this.width = w;
      this.displayWidth = w;
    }
    if (h) {
      this.height = h;
      this.displayHeight = h;
    }
    this.setColor(color);
  }

  setColor(color) {
    if (color) {
      this.setFillStyle(color || 0xFFFFFF, 1);
    }
  }

  release() {
    this.setActive(false);
    this.setVisible(false);
  }

}
