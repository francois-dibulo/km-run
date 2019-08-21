class GameScene extends BaseScene {

  constructor() {
    super("Game");
  }

  preload() {
    // this.load.image('unit', 'assets/images/agent_0.png');
  }

  // =====================================================================================
  // CREATE
  // =====================================================================================

  create() {
    var bbox = this.getBBox();

    // Object pool
    // this.item_group = this.add.group({
    //   classType: Item,
    //   maxSize: 20,
    //   runChildUpdate: true
    // });
  }

  // =====================================================================================
  // UPDATE & COLLISION
  // =====================================================================================

  update() {

  }

}
