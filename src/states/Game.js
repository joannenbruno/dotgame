/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Bubble from '../sprites/Bubble'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    /* BANNER */
    const bannerText = 'INDEED BUBBLE GAME';
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    });
    banner.padding.set(10, 16);
    banner.anchor.setTo(0.5);

    /* HEADER ITEMS */
    this.score = 0;
    this.points = [];
    this.scoreText = game.add.text(10,10,"Score: ", {
      font:"bold 20px Arial",
      fill: "#ffffff"
    });

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.popSound = game.add.audio('popSound');

    var button = game.add.button(
      275,
      30,
      'button',
      this.pauseGame(),
      this,
      2,
      1,
      0
    );

    button.anchor.x = .5;
    button.anchor.y = .5;

    /* BUBBLE GAME */
    this.bubbles = this.game.add.group();
    this.createBubble();

    game.time.events.loop(Phaser.Timer.SECOND, this.createBubble, this);
  
  }

  createBubble() {

      this.bubble = new Bubble({
        game: this.game,
        x: this.game.world.randomX,
        y: 100,
        asset: 'bubble',
        frame: 0
      });

      //enable click events
      this.bubble.inputEnabled = true;
      this.bubble.input.useHandCursor = true;
      this.bubble.events.onInputDown.add(this.pop, this);
      this.bubble.events.onInputDown.add(this.updateScore, this);
      //scale to random dot sizes between 10-100px
      var randSize = this.rnd.realInRange(0.025, 0.25)
      this.bubble.scale.setTo(randSize, randSize);
      this.bubble.inputEnabed = true;


      //adds bubble velocity to 100px/s
      game.physics.enable( [this.bubble], Phaser.Physics.ARCADE);
      this.bubble.body.velocity.y = 100;

      this.game.world.addChild(this.bubble);

  }

  pop(selectedBubble) {
    selectedBubble.animations.add('pop', [0,1,2,3,4,5,6,7,8,9,10,11,12]);
    selectedBubble.animations.play('pop', 48, false, true);
    this.popSound.play();

    this.updateScore(selectedBubble)
  }
  updateScore (selectedBubble) {

    if (selectedBubble.width >= 10 && selectedBubble.width < 20) {
      this.score +=10;
    }
    else if (selectedBubble.width >= 20 && selectedBubble.width < 30) {
      this.score +=9;
    }
    else if (selectedBubble.width >= 30 && selectedBubble.width < 40) {
      this.score +=8;
    }
    else if (selectedBubble.width >= 40 && selectedBubble.width < 50) {
      this.score +=7;
    }
    else if (selectedBubble.width >= 50 && selectedBubble.width < 60) {
      this.score +=6;
    }
    else if (selectedBubble.width >= 60 && selectedBubble.width < 70) {
      this.score +=5;
    }
    else if (selectedBubble.width >= 70 && selectedBubble.width < 80) {
      this.score +=4;
    }
    else if (selectedBubble.width >= 80 && selectedBubble.width < 90) {
      this.score +=3;
    }
    else if (selectedBubble.width >= 90 && selectedBubble.width < 100) {
      this.score +=2;
    }
    else {
      this.score ++;
    }
        this.scoreText.text = "Score: " + this.score;
  }

  pauseGame() {
    console.log("Game PAUSED.");
  }

  render() {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.bubble, 32, 32)
    //   //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }

  update() {

    // this.bubble.y += 5; //change to speed variable from slider
    // if (this.bubble.y >= this.game.world.height) {
    //   this.bubble.destroy();
    //   //this.createBubble();
    // }
  }
}
