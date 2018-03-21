/* globals __DEV__ */
import Phaser from 'phaser'
import Bubble from '../sprites/Bubble'

export default class extends Phaser.State {
  constructor() {
    super();
    this.yVelocity = 50;
  }

  get velocity() {
    this.yVelocity;
  }

  set velocity(velocityIncrease) {
    this.yVelocity = velocityIncrease;
  }

  init() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  preload() {
    this.popSound = game.add.audio('popSound');
  }

  create() {
    /* HEADER ITEMS */
    this.score = 0;
    this.scoreText = game.add.text(10, 10, "Score: " + this.score, {
      font: "bold 30px Arial",
      fill: "#ffffff"
    });
    this.line = new Phaser.Line(0,150,game.world.width,150);
    this.createSlider();
    this.createGameStateButton();

    /* BUBBLE GAME */
    game.time.events.loop(Phaser.Timer.SECOND, this.createBubble, this);
  }

  createSlider() {
    this.greySlider = game.add.sprite(game.world.centerX, 100, 'greySlider');
    this.greySlider.scale.setTo(1.75, 1.75);
    this.greySlider.anchor.x = .5;
    this.greySlider.anchor.y = .5;

    this.greySliderEnd = game.add.sprite(15, 100, 'greySliderEnd');
    this.greySliderEnd.scale.setTo(1.75, 1.75);
    this.greySliderEnd.anchor.setTo(0.5);

    this.greySliderEnd_2 = game.add.sprite(360, 100, 'greySliderEnd');
    this.greySliderEnd_2.scale.setTo(1.75, 1.75);
    this.greySliderEnd_2.anchor.set(0.5);

    this.greySliderDown = game.add.sprite(181, 100, 'greySliderDown');
    this.greySliderDown.anchor.setTo(0.5);
    this.greySliderDown.inputEnabled = true;
    this.greySliderDown.input.enableDrag();
    let bounds = new Phaser.Rectangle(15, 100, this.greySlider.width, 0);
    this.greySliderDown.input.boundsRect = bounds;
    this.greySliderDown.input.useHandCursor = true;

    this.speedText = game.add.text(10, 115, "Speed: " + this.yVelocity + " pps", {
      font: "bold 20px Arial",
      fill: "#ffffff"
    });

    this.setVelocityOnStop();
  }

  setVelocityOnStop() {
    this.greySliderDown.events.onDragStop.add(function (e) {
      var xCoordinate = this.greySliderDown.x;

      if (xCoordinate >= 0 && xCoordinate < 59.45) {
        this.yVelocity = 10;
      }
      else if (xCoordinate >= 59.45 && xCoordinate < 89.9) {
        this.yVelocity = 20;
      }
      else if (xCoordinate >= 89.9 && xCoordinate < 120.35) {
        this.yVelocity = 30;
      }
      else if (xCoordinate >= 120.35 && xCoordinate < 150.8) {
        this.yVelocity = 40;
      }
      else if (xCoordinate >= 150.8 && xCoordinate < 181.25) {
        this.yVelocity = 50;
      }
      else if (xCoordinate >= 181.25 && xCoordinate < 211.7) {
        this.yVelocity = 60;
      }
      else if (xCoordinate >= 211.7 && xCoordinate < 242.15) {
        this.yVelocity = 70;
      }
      else if (xCoordinate >= 242.15 && xCoordinate < 272.6) {
        this.yVelocity = 80;
      }
      else if (xCoordinate >= 272.6 && xCoordinate < 303.05) {
        this.yVelocity = 90;
      }
      else if (xCoordinate >= 303.05 && xCoordinate < game.world.width) {
        this.yVelocity = 100;
      }
      else {
        this.yVelocity = 50;
      }

    }, this);
  }

  createGameStateButton() {
    this.gameStateButton = this.game.add.sprite(290, 30, 'button');
    this.gameStateButton.inputEnabled = true;

    this.gameStateButton.events.onInputUp.add(function (e) {
      game.paused = true;
      if (e.frame === 1) {
        e.frame = 0
      }
      e.parent.children.forEach(function (child) {
        if (child.text === "Pause") {
          child.text = "Start"
        }
      });
    });

    this.gameStateButton.scale.setTo(0.75);
    this.gameStateButton.anchor.setTo(0.5)

    this.buttonText = game.add.text(290, 30, "Pause", {
      font: "25px Arial",
      fill: "#ffffff"
    });
    this.buttonText.anchor.setTo(0.5);

    game.input.onDown.add(this.unpause, self);
  }

  unpause(gameStateButton) {
    game.paused = false;
    gameStateButton.frame = 1;
    game.world.children.forEach(function (child) {
      if (child.text === "Start") {
        child.text = "Pause"
      }
    });
  }

  createBubble() {
    this.bubble = new Bubble({
      game: this.game,
      x: this.game.world.randomX,
      y: 165,
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

    //adds bubble velocity to 100px/s
    game.physics.enable([this.bubble], Phaser.Physics.ARCADE);
    this.bubble.body.velocity.y = this.yVelocity;

    this.game.world.addChild(this.bubble);

  }

  pop(selectedBubble) {
    selectedBubble.inputEnabled = false;

    selectedBubble.animations.add('pop', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    selectedBubble.animations.play('pop', 48, false, true);
    this.popSound.play();

    this.updateScore(selectedBubble);
  }

  updateScore(selectedBubble) {
    if (selectedBubble.width >= 10 && selectedBubble.width < 20) {
      this.score += 10;
    }
    else if (selectedBubble.width >= 20 && selectedBubble.width < 30) {
      this.score += 9;
    }
    else if (selectedBubble.width >= 30 && selectedBubble.width < 40) {
      this.score += 8;
    }
    else if (selectedBubble.width >= 40 && selectedBubble.width < 50) {
      this.score += 7;
    }
    else if (selectedBubble.width >= 50 && selectedBubble.width < 60) {
      this.score += 6;
    }
    else if (selectedBubble.width >= 60 && selectedBubble.width < 70) {
      this.score += 5;
    }
    else if (selectedBubble.width >= 70 && selectedBubble.width < 80) {
      this.score += 4;
    }
    else if (selectedBubble.width >= 80 && selectedBubble.width < 90) {
      this.score += 3;
    }
    else if (selectedBubble.width >= 90 && selectedBubble.width < 100) {
      this.score += 2;
    }
    else {
      this.score++;
    }
    this.scoreText.text = "Score: " + this.score;
  }

  updateButtonFrame() {
    if(this.buttonText.text == "Pause") {
      this.gameStateButton.frame = 1;
    }
    else if (this.buttonText.text == "Start"){
      this.gameStateButton.frame = 0;
    }
    else
      this.gameStateButton.frame = 1;
  }

  render() {
    game.debug.geom(this.line, '#FFF')
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.bubble, 32, 32)
    // }
  }

  update() {
    this.speedText.text = "Speed: " + this.yVelocity + " pps";

    this.updateButtonFrame();
  }
}
