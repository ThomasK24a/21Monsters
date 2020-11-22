/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class Participant {
    constructor(health, armor, attack, bonusAttack, texture, name, x, y, scene) {
        this.scene = scene
        var style = { font: "20px Arial", fill: "#FFFFFF", wordWrap: true, align: "center" };
        this.asActiveCombatant = new ActiveCombatant(new Combatant(health, armor, attack, bonusAttack, texture, name), x, y, texture, scene);
        this.drawnCards = new Array();
        this.cardPile = new Array();
        this.cardValueText = scene.add.text(x - 217, y - 40, "Card value: " + 0, style);
        this.cardAmountText = scene.add.text(x - 217, y, "Cards drawn: " + 0, style);
    }

    update() {
        this.asActiveCombatant.update();
        this.cardAmountText.text = "Cards drawn: " + this.drawnCards.length;
        this.cardValueText.text = "Card value: " + this.getCardsValue();
    }

    addCard(card) {
        this.drawnCards.push(card);
        card.x = this.asActiveCombatant.x - 300 + this.drawnCards.length * 5;
        card.y = this.asActiveCombatant.y + this.drawnCards.length;
        card.valueText.x = this.asActiveCombatant.x - 300 + this.drawnCards.length * 5;
        card.valueText.y = this.asActiveCombatant.y - 50 + this.drawnCards.length;
    }

    getCardsValue() {
        var cardsValue = 0;
        for (var i = 0; i < this.drawnCards.length; i++) {
            cardsValue += this.drawnCards[i].value;
        }
        return cardsValue;
    }  
}