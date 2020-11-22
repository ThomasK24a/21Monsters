/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class MenuScene extends Phaser.Scene {
    constructor() {
        super({key:"MenuScene"});
    }

    preload() {
        this.load.image('button', 'images/Button.png');
    }

    create(data) {
        var headerStyle = { font: "48px Arial", fill: "#ffffff", wordWrap: true, align: "center" };
        this.add.text(560, 300, "21 Monsters", headerStyle);
        var buttonStyle = { font: "16px Arial", fill: "#00000", wordWrap: true, align: "center" };
        //initialize buttons
        this.newRoundButton = { button: this.add.image(700, 400, 'button'), text: this.add.text(660, 390, "Start Game", buttonStyle) };
        this.newRoundButton.button.setInteractive();
        this.newRoundButton.button.on('pointerdown', function (event) {
            console.log("new game");
            this.scene.start('RoundScene', { outcomes: [] });
        }, this);
    }

    update() {

    }

}