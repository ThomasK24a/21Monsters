/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    init(data) {
        this.outcome = data.outcome;
    }

    create() {
        var headerStyle = { font: "48px Arial", fill: "#ffffff", wordWrap: true, align: "center" };
        if (this.outcome == "won") {
            this.add.text(610, 300, "You won", headerStyle);
        } else {
            this.add.text(610, 300, "You lost", headerStyle);
        }
        var buttonStyle = { font: "16px Arial", fill: "#00000", wordWrap: true, align: "center" };
        this.newRoundButton = { button: this.add.image(700, 400, 'button'), text: this.add.text(660, 390, "New Game", buttonStyle) };
        this.newRoundButton.button.setInteractive();
        this.newRoundButton.button.on('pointerdown', function (event) {
            console.log("new game");
            this.scene.start('RoundScene', { outcomes: [] });
        }, this);
    }
}