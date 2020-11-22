/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class Combatant{
    constructor(health, armor, attack, bonusAttack, texture, name) {
        this.maxHealth = health
        this.health = health,
            this.armor = armor,
            this.attack = attack,
            this.bonusAttack = bonusAttack,
            this.texture = texture,
            this.name = name
        
    }

    heal() {
        this.health = this.maxHealth;
    }
}