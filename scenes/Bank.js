class Bank extends Phaser.Scene {
  constructor(){ super("Bank"); }

  preload(){
    this.load.image("bank", "assets/bank_768x512.png");
    this.load.spritesheet("player", "assets/player.png",
      { frameWidth:32, frameHeight:32 });
  }

  create(){
    this.add.image(0,0,"bank").setOrigin(0);

    this.player = this.physics.add.sprite(380,420,"player");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey("E");

    this.exitRect = { x:340, y:470, w:80, h:40 };

    this.createAnimations();
  }

  createAnimations(){
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

  update(){
    const spd = 120;
    this.player.setVelocity(0);

    if(this.cursors.left.isDown)  this.player.setVelocityX(-spd);
    if(this.cursors.right.isDown) this.player.setVelocityX(spd);
    if(this.cursors.up.isDown)    this.player.setVelocityY(-spd);
    if(this.cursors.down.isDown)  this.player.setVelocityY(spd);

    // Eキーで外へ戻る
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      if (this.checkExit()) {
        this.cameras.main.fadeOut(200);
        this.time.delayedCall(200, () => {
          this.scene.start("MainMap");
        });
      }
    }
  }

  checkExit(){
    const p = this.player;
    const e = this.exitRect;
    return (p.x>e.x && p.x<e.x+e.w && p.y>e.y && p.y<e.y+e.h);
  }
}
