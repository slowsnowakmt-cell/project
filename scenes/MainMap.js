class MainMap extends Phaser.Scene {
  constructor() { super("MainMap"); }

  preload() {
    this.load.image("map", "assets/map.png");
    this.load.spritesheet("player", "assets/player.png",
      { frameWidth:32, frameHeight:32 });
  }

  create() {
    this.add.image(0,0,"map").setOrigin(0);

    this.player = this.physics.add.sprite(150,200,"player");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey("E");

    // 扉座標
    this.doors = {
      Home:   { x:145, y:198, w:40, h:40 },
      Bank:   { x:546, y:200, w:40, h:40 },
      Mart:   { x:586, y:363, w:40, h:40 },
      Cinema: { x:387, y:466, w:40, h:40 }
    };

    this.createAnimations();
  }

  createAnimations() {
    this.anims.create({ key:"down",
      frames:this.anims.generateFrameNumbers("player",{start:0,end:2}),
      frameRate:8, repeat:-1 });
    this.anims.create({ key:"left",
      frames:this.anims.generateFrameNumbers("player",{start:3,end:5}),
      frameRate:8, repeat:-1 });
    this.anims.create({ key:"right",
      frames:this.anims.generateFrameNumbers("player",{start:6,end:8}),
      frameRate:8, repeat:-1 });
    this.anims.create({ key:"up",
      frames:this.anims.generateFrameNumbers("player",{start:9,end:11}),
      frameRate:8, repeat:-1 });
  }

  update() {
    const spd = 120;
    this.player.setVelocity(0);

    if(this.cursors.left.isDown)  this.player.setVelocityX(-spd);
    if(this.cursors.right.isDown) this.player.setVelocityX(spd);
    if(this.cursors.up.isDown)    this.player.setVelocityY(-spd);
    if(this.cursors.down.isDown)  this.player.setVelocityY(spd);

    // 扉判定
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      for(let key in this.doors) {
        const d = this.doors[key];
        if (this.checkDoor(d)) {
          this.cameras.main.fadeOut(200);
          this.time.delayedCall(200, () => {
            this.scene.start(key);   // Home, Bank, Mart, Cinema へ切替
          });
        }
      }
    }
  }

  checkDoor(d) {
    return (
      this.player.x > d.x &&
      this.player.x < d.x + d.w &&
      this.player.y > d.y &&
      this.player.y < d.y + d.h
    );
  }
}
