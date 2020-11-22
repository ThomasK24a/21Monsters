/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class ActiveCombatant extends Phaser.GameObjects.Sprite {
    constructor(combatant, x, y, texture, scene) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        var style = { font: "20px Arial", fill: "#00000", align: "center" };
        this.combatant = combatant;
        this.healthText = scene.add.text(x - 37, y - 58, 0, style);
        this.healthText.setOrigin(0.5);
        this.armorText = scene.add.text(x + 37, y - 58, 0, style);
        this.armorText.setOrigin(0.5);
        this.attackText = scene.add.text(x - 39, y + 58, 0, style);
        this.attackText.setOrigin(0.5);
        this.bonusAttText = scene.add.text(x + 37, y + 58, 0, style);
        this.bonusAttText.setOrigin(0.5);
        this.nameText = scene.add.text(x, y, 0, style);
        this.nameText.setOrigin(0.5);
        if (combatant == null) {
            this.setVisibility(false);
        }

        this.x = x;
        this.y = y;
        

        
    }

    update() {
        if (this.combatant != null) {
            this.setVisibility(true);
            var style = { font: "20px Arial", fill: "#00000", align: "center" };
            this.healthText.setText(this.combatant.health, style);
            this.armorText.setText(this.combatant.armor, style);
            this.attackText.setText(this.combatant.attack, style);
            this.bonusAttText.setText(this.combatant.bonusAttack, style);
            this.nameText.setText(this.combatant.name, style);
        } else {
            this.setVisibility(false);
        }
    }

    calculateAttack() {
        var totalAttack = this.combatant.attack + Math.floor(Math.random() * this.combatant.bonusAttack) + 1
        return totalAttack;
    }

    calculateNewHealth(oppAttack) {
        var damage = oppAttack - this.combatant.armor;
        if (damage < 0) {
            damage = 0;
        }
        this.combatant.health = this.combatant.health - damage;
    }

    heal() {
        if(this.combatant != null)
            this.combatant.heal();
    }

    setVisibility(bool) {
        this.healthText.setVisible(bool);
        this.armorText.setVisible(bool);
        this.attackText.setVisible(bool);
        this.bonusAttText.setVisible(bool);
        this.setVisible(bool);
        this.nameText.setVisible(bool);
    }
}