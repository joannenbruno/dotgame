import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init() { }

  preload() {

    /* BANNER */
    const bannerText = 'Bubble "Dot" Game';
    let banner = this.add.text(this.world.centerX, this.world.centerY -80, bannerText, {
      font: 'bold 35px Arial',
      fill: '#FFFFFF',
      smoothed: false
    });
    banner.padding.set(10, 16);
    banner.anchor.setTo(0.5);


    /* ASSETS */
    this.load.spritesheet('bubble', 'assets/images/bubble.png', 400, 400, 12);
    this.load.spritesheet('button', 'assets/images/button.png', 190, 49, 2);
    this.load.audio('popSound', 'assets/audio/dustyroom_cartoon_bubble_pop.mp3')
    this.load.image('greySlider', 'assets/images/grey_sliderHorizontal.png');
    this.load.image('greySliderEnd', 'assets/images/grey_sliderEnd.png');
    this.load.image('greySliderDown', 'assets/images/grey_sliderDown.png');
  }

  create() {

    this.startButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'button');
    this.startButton.inputEnabled = true;

    this.startButton.events.onInputUp.add(function (e) {
      game.paused = false;
      e.game.state.start('Game');
    });
    this.startButton.anchor.setTo(0.5);

    this.startButtonText = game.add.text(this.game.world.centerX, this.game.world.centerY, "Start", {
      font: "30px Arial",
      fill: "#ffffff"
    });
    this.startButtonText.anchor.setTo(0.5);

  }

}
