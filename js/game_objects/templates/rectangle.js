/**
 * Template class for a Rectangle Sprite
 */
class TemplateRectangle extends Phaser.GameObjects.Rectangle {

  constructor(scene, x, y, w, h, color) {
    super(scene, x, y, w, h, color);
    this._id = randomId();
    this.setOrigin(0, 0);
    scene.add.existing(this);
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
