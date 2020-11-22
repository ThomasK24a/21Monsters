/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

//----VARIABLES----
var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 800,
    scene: [MenuScene, RoundScene, EndScene]
};

var game = new Phaser.Game(config);




