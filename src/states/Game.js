/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Bubble from '../sprites/Bubble'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    const bannerText = 'INDEED BUBBLE GAME';
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    });

    banner.padding.set(10, 16);
    banner.anchor.setTo(0.5);

    var button = game.add.button(
      250,
      100,
      'button',
      this.togglePause(),
      this,
      2,
      1,
      0
    );
    button.anchor.x = .5;
    button.anchor.y = .5;

    //this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, this.createBubble());
    //this.game.time.events.add(Phaser.Timer.SECOND * 2, this.createBubble());

    //this.createBubble();
    
  }

  pop() {
    this.bubble.animations.add('pop');
    this.bubble.animations.play('pop', 12, true);
    this.bubble.destroy();
    //this.game.sound.play('pop')
  }

  render() {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.bubble, 32, 32)
    //   //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }

  createBubble() {
    this.bubble = new Bubble({
      game: this.game,
      x: game.world.randomX,
      y: 200,
      asset: 'bubble',
      frame: 0
    });
    var randSize = this.game.rnd.realInRange(0.025, 0.25)
    this.bubble.scale.setTo(randSize, randSize);
    this.game.add.existing(this.bubble);
  }

  togglePause() {
    console.log("Game PAUSED.");
  }

  update() {
    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, this.createBubble, this);
    this.bubble.y += 5; //change to speed variable from slider
    if (this.bubble.y >= this.game.world.height) {
      this.bubble.destroy();
      //this.createBubble();
    }

  }
}
