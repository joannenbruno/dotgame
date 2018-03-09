import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.spritesheet('bubble','assets/images/bubble.png', 400, 400, 12);
    this.load.spritesheet('button', 'assets/images/button.png',190, 49, 2);
    this.load.audio('popSound','assets/audio/dustyroom_cartoon_bubble_pop.mp3')
  }

  create () {
    this.state.start('Game');
  }
}
