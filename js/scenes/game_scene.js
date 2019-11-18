/**
  - Score
  - Inverse movement
  - Onboarding
  - make it faster
  - Replace dude
*/
class GameScene extends BaseScene {

  constructor() {
    super("Game");
    this.current_direction = 0;
    this.dude_sprite = null;
    this.explain_image = null;
    this.Color = {
      Default: "#CCC",
      Wrong: "#f44336",
      Correct: "#8bc34a"
    }
    this.walked_x = 0;
    this.walked_y = 0;
    this.swipe_clear = true;
    this.swipe_time_ms = 3000;
    this.reset_time_ms = 1000;
    this.countdown_rect = null;
    this.move_tween = null;
    this.onboard_steps = [1, 2, 3, 4, 5, 6, 7, 8];
    this.swipe_counts = 0;
  }

  preload() {
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 128, frameHeight: 128 });
    this.load.image("dir_help", 'dirs.png');
  }

  // =====================================================================================
  // CREATE
  // =====================================================================================

  create() {
    var bbox = this.getBBox();

    var h = 10;
    this.countdown_rect = new CountdownRectangle(this, 0, bbox.bottom - h, bbox.right, h, 0x2196f3);
    this.countdown_rect.on("DONE", this.onFail.bind(this));

    var swipe_ele = document.getElementById("swipe-area");
    this.swiper = new SwipeDigital(swipe_ele, {
      allowed_directions: SwipeDigital.ALLOWED_DIRECTIONS.EIGHTWAY,
      onTrigger: this.onSwipe.bind(this)
    });

    this.direction_txt = this.add.text(bbox.center_x, 80, '', { fontFamily: 'Arial', fontSize: 120, color: '#CCC' });
    this.direction_txt.setOrigin(0.5);

    var fwd_ani = [52, 53, 54, 55, 54, 53, 52];

    this.anims.create({
      key: 'walk_1',
      frames: this.anims.generateFrameNames('dude', { frames: fwd_ani }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_2',
      frames: this.anims.generateFrameNames('dude', { frames: fwd_ani }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_3',
      frames: this.anims.generateFrameNames('dude', { frames: fwd_ani }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_4',
      frames: this.anims.generateFrameNames('dude', { frames: fwd_ani }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_5',
      frames: this.anims.generateFrameNames('dude', { frames: [76, 75, 74, 73, 72, 52] }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_6',
      frames: this.anims.generateFrameNames('dude', { frames: [66, 65, 64, 63, 62, 52] }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_7',
      frames: this.anims.generateFrameNames('dude', { frames: [83, 84, 85, 86, 87, 52] }),
      repeat: 0,
      duration: 400
    });

    this.anims.create({
      key: 'walk_8',
      frames: this.anims.generateFrameNames('dude', { frames: [86, 85, 84, 83, 82, 52] }),
      repeat: 0,
      duration: 400
    });

    this.start_x = bbox.center_x
    this.start_y = bbox.center_y + 64;
    this.dude_sprite = this.add.sprite(this.start_x, this.start_y, 'dude').play('walk_1');

    this.explain_image = this.add.image(this.start_x, this.start_y, 'dir_help')

    this.setRandomDirection();
  }

  setRandomDirection() {
    this.walked_x = 0;
    this.walked_y = 0;

    if (this.onboard_steps.length > 0) {
      this.current_direction = this.onboard_steps.shift();
    } else {
      this.current_direction = Phaser.Math.Between(1, 8);
    }

    this.direction_txt.setColor(this.Color.Default);
    this.direction_txt.setText(this.current_direction);
    this.swipe_clear = true;
    this.countdown_rect.start(this.swipe_time_ms);

    if (this.swipe_counts === 8) {
      this.explain_image.destroy();
    }

    // Every x swipe, increase the speed
    if (this.swipe_counts > 0 && this.swipe_counts % 10 === 0) {
      this.swipe_time_ms = Math.max(800, this.swipe_time_ms - 500);
    }
  }

  onSwipe(data) {
    if (!this.swipe_clear) return;
    this.swipe_clear = false;
    var map = {
      "up": 1,
      "down": 2,
      "left": 4,
      "right": 8
    };

    var sum = 0;
    for (var dir in data) {
      if (data[dir] === true) {
        sum += map[dir];
      }
    }

    var sum_dir_map = {
      1: 1,
      2: 2,
      4: 3,
      8: 4,
      5: 5,
      10: 6,
      9: 7,
      6: 8
    };

    var direction = sum_dir_map[sum];
    var x = 0;
    var y = 0;
    var distance = 50;

    if (direction === 1 || direction === 5 || direction === 7) {
      y = -distance;
    }
    if (direction === 2 || direction === 8 || direction === 6) {
      y = distance;
    }
    if (direction === 3 || direction === 5 || direction === 8) {
      x = -distance;
    }
    if (direction === 4 || direction === 7 || direction === 6) {
      x = distance;
    }

    this.walked_x = x;
    this.walked_y = y;

    this.swipe_counts++;
    this.dude_sprite.play('walk_' + direction);
    this.tweenPlayer(x, y);
    this.evaluateMove(direction);
  }

  tweenPlayer(x, y, delay) {
    if (this.move_tween) {
      this.move_tween.stop();
    }

    if (x || y) {
      this.move_tween = this.tweens.add({
        targets: this.dude_sprite,
        props: {
          x: { value: '+=' + x, duration: 300 },
          y: { value: '+=' + y, duration: 300 }
        },
        delay: delay || 0
       });
    } else {
      this.move_tween = this.tweens.add({
        targets: this.dude_sprite,
        props: {
          x: { value: this.start_x, duration: 300 },
          y: { value: this.start_y, duration: 300 }
        }
       });
    }
  }

  evaluateMove(swiped_direction) {
    if (this.current_direction === swiped_direction) {
      this.direction_txt.setColor(this.Color.Correct);
    } else {
      this.direction_txt.setColor(this.Color.Wrong);
    }

    this.countdown_rect.pause();

    this.time.delayedCall(500, function() {
      this.tweenPlayer();
    }, [], this);

    this.time.delayedCall(this.reset_time_ms, function() {
      this.setRandomDirection();
    }, [], this);
  }

  onFail() {
    this.evaluateMove(-1);
  }

  // =====================================================================================
  // UPDATE & COLLISION
  // =====================================================================================

  update() {

  }

}
