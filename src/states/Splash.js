import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init() { }

  preload() {

    /* BANNER */
    const bannerText = 'INDEED BUBBLE GAME';
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    });
    banner.padding.set(10, 16);
    banner.anchor.setTo(0.5);

    /*ASSETS*/
    this.load.spritesheet('bubble', 'assets/images/bubble.png', 400, 400, 12);
    this.load.spritesheet('button', 'assets/images/button.png', 190, 49, 2);
    this.load.audio('popSound', 'assets/audio/dustyroom_cartoon_bubble_pop.mp3')
    this.load.image('greySlider', 'assets/images/grey_sliderHorizontal.png');
    this.load.image('greySliderEnd', 'assets/images/grey_sliderEnd.png');
    this.load.image('greySliderDown', 'assets/images/grey_sliderDown.png');
  }

  create() {
    this.state.start('Game');
  }

}
