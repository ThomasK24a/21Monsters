/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class Card extends Phaser.GameObjects.Sprite {
    constructor(suit, value, display, x, y, texture, scene) {
        super(scene, x, y, texture, suit - 1);
        scene.add.existing(this);
        this.value = value;
        this.suit = suit;
        this.display = display;
        this.setVisible(false);

        var style = { font: "32px Arial", fill: "#00000", wordWrap: true, align: "center" };
        this.valueText = scene.add.text(x, y - 50, display, style);
        this.valueText.setOrigin(0.5);
        this.valueText.setVisible(false);
    }

    setVisibility(bool) {
        this.setVisible(bool);
        this.valueText.setVisible(bool);
    }
}