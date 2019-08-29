class TemplateSprite extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
    this.move_tween = null;
  }

  revive(x, y) {
    this.clearTweens();
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
  }

  release() {
    this.clearTweens();
    this.setActive(false);
    this.setVisible(false);
  }

  clearTweens() {
    if (this.move_tween) {
      this.move_tween.stop();
      this.move_tween = null;
    }
  }

  moveTo(x, is_absolute, cb_event) {
      var data = {
        targets: [this],
        duration: 600,
        ease: 'Sine.easeInOut',
        callbackScope: this,
        onComplete: function() {
          if (cb_event) {
            if (typeof cb_event === "function") {
              cb_event();
            } else {
              this.emit(cb_event);
            }
          }
        }
      };

      if (is_absolute) {
        data.x = x
      } else {
        data.props = {
          x: {
            value: "+= " +  x
          }
        };
      }

      this.move_tween = this.scene.tweens.add(data);
    }

}
