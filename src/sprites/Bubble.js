import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({ game, x, y, asset, frame }) {
        super(game, x, y, asset, frame)

        //sets the pivot point of the sprite to the center
        this.anchor.setTo(0.5, 0.5)

        //calculate random x coordinate
        //this.x = this.game.rnd.integer();

    }

    update() {}
  


}
