/** @type {import ("../typings/phaser")}*/
//Thomas Koops
//1396796
//13/07/2020

class RoundScene extends Phaser.Scene {
    constructor() {
        super({ key: "RoundScene" });
        
    }

    init(data) {
        this.outcomes = data.outcomes;
    }

    preload() {
        this.load.spritesheet('cards', 'images/CardTemplates.png',
            { frameWidth: 130, frameHeight: 180 }
        );

        this.load.image('table', 'images/Poker-table.png');
        this.load.image('fdCard', 'images/facedownCard.png');
        this.load.image('CmbtCard', 'images/CmbtCard.png');
        this.load.image('button', 'images/Button.png');
    }

    create() {
        this.phaser = this;

        //create camera
        this.camera = this.cameras.add(0, 0, 1400, 800);
        this.camera.setBackgroundColor('rgb(70, 44, 30)');

        //create background
        this.backgroundTable = this.add.sprite(0, 87.5, 'table');
        this.backgroundTable.setOrigin(0);
        this.backgroundTable.setScale(2);

        //text styles
        var style = { font: "32px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: this.backgroundTable.width, align: "center" };
        var buttonStyle = { font: "16px Arial", fill: "#00000", wordWrap: true, wordWrapWidth: this.backgroundTable.width, align: "center" };

        this.standButton = { button: this.add.image(600, 400, 'button'), text: this.add.text(580, 390, "Stand", buttonStyle) };
        this.standButton.button.setInteractive();
        this.standButton.button.on('clicked', this.standButtonClick, this);
        this.standButton.button.setVisible(false);
        this.standButton.text.setVisible(false);

        this.hitButton = { button: this.add.image(800, 400, 'button'), text: this.add.text(780, 390, "Hit", buttonStyle) };
        this.hitButton.button.setInteractive();
        this.hitButton.button.on('clicked', this.hitButtonClick, this);
        this.hitButton.button.setVisible(false);
        this.hitButton.text.setVisible(false);

        //Create deck image
        this.deckSprite = this.add.image(1100, 400, 'fdCard');
        this.deckSprite.setScale(0.6);
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);


        this.add.text(1000, 20, "Score: " + this.calculateRoundsWon() + "-" + (this.outcomes.length - this.calculateRoundsWon()), style);

        this.currentTurn = "player";
        this.phase = "predraw";
        this.monsterList = new Array();
        this.isPlaying = true;

        this.dealer = new Participant(25, 3, 2, 10, 'CmbtCard', "dealer", 700, 100 ,this)
        this.player = new Participant(25, 3, 6, 3, 'CmbtCard', "player", 700, 700, this)
        this.currentMonster = new ActiveCombatant(null, 300, 400, 'CmbtCard', this.phaser);
        this.generateMonsterList();
        this.generateNewDeck();


        this.bufferTime = new Date().getTime();

    }

    update() {
        if (!this.isDealerPlaying() && !this.isPlayerPlaying()) {
            this.phase = "end";
        }

        if (new Date().getTime() > this.bufferTime + 500) {
            this.bufferTime = new Date().getTime();
            switch (this.phase) {
                case "predraw":
                    this.predrawPhase();
                    break;
                case "draw":
                    this.drawPhase();
                    break;
                case "combat":
                    this.combatPhase();
                    break;
                case "end":
                    this.endPhase();
                    break;
                default:
                    console.log("Phase not set correctly");
                    break;
            }
        }

        this.dealer.update();
        this.player.update();
        this.currentMonster.update();
    }

    isPlayerPlaying() {
        //          player has to both have health and have not standed     and             the dealer must not be dead with less card value than the player                        and     neither the dealer or player must have reached 21
        return (this.player.asActiveCombatant.combatant.health > 0 && this.isPlaying) && !(this.dealer.asActiveCombatant.combatant.health <= 0 && this.player.getCardsValue() >= this.dealer.getCardsValue()) && (this.dealer.getCardsValue() != 21) && (this.player.getCardsValue() != 21);
    }

    isDealerPlaying() {
        //          the dealer must not be dead             and     the player must not be dead           and the player must either be playing or have more value than the dealer and neither the dealer or player must have reached 21
        return this.dealer.asActiveCombatant.combatant.health > 0 && this.player.asActiveCombatant.combatant.health > 0 && (this.isPlaying || this.dealer.getCardsValue() <= this.player.getCardsValue()) && (this.dealer.getCardsValue() != 21) && (this.player.getCardsValue() != 21);
    }

    generateMonsterList() {
        this.monsterList.push(new Combatant(10, 0, 4, 3, null, "slime"));
        this.monsterList.push(new Combatant(11, 0, 4, 3, null, "slime"));
        this.monsterList.push(new Combatant(12, 0, 4, 3, null, "slime"));
        this.monsterList.push(new Combatant(13, 0, 4, 3, null, "slime"));
        this.monsterList.push(new Combatant(12, 0, 5, 3, null, "goblin"));
        this.monsterList.push(new Combatant(12, 0, 5, 4, null, "goblin"));
        this.monsterList.push(new Combatant(12, 0, 5, 5, null, "goblin"));
        this.monsterList.push(new Combatant(12, 0, 6, 4, null, "goblin"));
        this.monsterList.push(new Combatant(12, 1, 6, 2, null, "Orc"));
        this.monsterList.push(new Combatant(14, 1, 6, 2, null, "Orc"));
        this.monsterList.push(new Combatant(12, 2, 6, 2, null, "Orc"));
        this.monsterList.push(new Combatant(14, 2, 6, 2, null, "Orc"));
        this.monsterList.push(new Combatant(13, 4, 3, 3, null, "Golem"));
        this.monsterList.push(new Combatant(13, 4, 3, 4, null, "Golem"));
        this.monsterList.push(new Combatant(13, 4, 5, 2, null, "Golem"));
        this.monsterList.push(new Combatant(20, 0, 5, 4, null, "Hydra"));
        this.monsterList.push(new Combatant(20, 0, 5, 5, null, "Hydra"));
        this.monsterList.push(new Combatant(20, 0, 5, 6, null, "Hydra"));
        this.monsterList.push(new Combatant(17, 3, 3, 7, null, "Dragon"));
        this.monsterList.push(new Combatant(17, 3, 3, 8, null, "Dragon"));
        this.monsterList.push(new Combatant(17, 3, 3, 9, null, "Dragon"));


    }

    generateNewDeck() {
        this.deck = [];
        for (var i = 1; i < 5; i++) {
            this.deck.push(new Card(i, 11, "A", 900, 400, 'cards', this));
            for (var j = 2; j < 11; j++) {
                this.deck.push(new Card(i, j, j, 900, 400, 'cards', this));

            }
            this.deck.push(new Card(i, 10, "J", 900, 400, 'cards', this));
            this.deck.push(new Card(i, 10, "Q", 900, 400, 'cards', this));
            this.deck.push(new Card(i, 10, "K", 900, 400, 'cards', this));
        }
        this.shuffleDeck();

    }

    shuffleDeck() {
        var newArray = new Array();
        for (var i = this.deck.length - 1; i > 0; i--) {
            var index = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[index]] = [this.deck[index], this.deck[i]];
        }
    }

    drawCard() {
        var card = this.deck.pop();
        return card;
    }

    standButtonClick() {
        this.hitButton.button.setVisible(false);
        this.hitButton.text.setVisible(false);
        this.standButton.button.setVisible(false);
        this.standButton.text.setVisible(false);
        this.isPlaying = false;
        this.currentTurn = "dealer";
    }

    hitButtonClick() {
        this.hitButton.button.setVisible(false);
        this.hitButton.text.setVisible(false);
        this.standButton.button.setVisible(false);
        this.standButton.text.setVisible(false);
        this.phase = "draw";
    }

    predrawPhase() {
        if (this.currentTurn == "dealer" || this.player.drawnCards.length == 0 || !this.isPlayerPlaying()) {
            this.phase = "draw";
        } else {
            this.standButton.button.setVisible(true);
            this.standButton.text.setVisible(true);
            this.hitButton.button.setVisible(true);
            this.hitButton.text.setVisible(true);
        }
    }

    drawPhase() {
        if (this.currentTurn == "player") {
            if (this.isPlayerPlaying()) {
                this.lastDrawnCard = this.drawCard();
                this.lastDrawnCard.setVisibility(true);
                if (this.player.getCardsValue() + this.lastDrawnCard.value > 21) {
                    this.player.asActiveCombatant.combatant.health = 0;
                    this.phase = "combat";
                } else {
                    this.currentMonster.combatant = this.monsterList[this.player.getCardsValue() - 1 + this.lastDrawnCard.value];
                    this.phase = "combat";
                }

            } else {
                this.currentTurn = "dealer";
                this.phase = "predraw";
            }
        } else if (this.currentTurn == "dealer") {
            if (this.isDealerPlaying()) {
                this.lastDrawnCard = this.drawCard();
                this.lastDrawnCard.setVisibility(true);
                if (this.dealer.getCardsValue() + this.lastDrawnCard.value > 21) {
                    this.dealer.asActiveCombatant.combatant.health = 0;
                    this.phase = "combat";
                } else {
                    this.currentMonster.combatant = this.monsterList[this.dealer.getCardsValue() - 1 + this.lastDrawnCard.value];
                    this.phase = "combat";
                }

            } else {
                this.currentTurn = "player";
                this.phase = "predraw";
            }
        }
    }

    combatPhase() {
        if (this.currentTurn == "player") {
            if (this.player.asActiveCombatant.combatant.health > 0) {
                this.currentMonster.calculateNewHealth(this.player.asActiveCombatant.calculateAttack());
                if (this.currentMonster.combatant.health > 0) {
                    this.player.asActiveCombatant.calculateNewHealth(this.currentMonster.calculateAttack());
                } else {
                    this.player.addCard(this.lastDrawnCard);
                    this.currentTurn = "dealer";
                    this.currentMonster.heal();
                    this.phase = "predraw";
                    this.currentMonster.combatant = null;
                }
            } else {
                this.currentMonster.heal();
                this.currentTurn = "dealer";
                this.phase = "predraw";
                this.currentMonster.combatant = null;
                this.lastDrawnCard.setVisibility(false);
            }
        } else if (this.currentTurn == "dealer") {
            if (this.dealer.asActiveCombatant.combatant.health > 0) {
                this.currentMonster.calculateNewHealth(this.dealer.asActiveCombatant.calculateAttack());
                if (this.currentMonster.combatant.health > 0) {
                    this.dealer.asActiveCombatant.calculateNewHealth(this.currentMonster.calculateAttack());
                } else {
                    this.dealer.addCard(this.lastDrawnCard);
                    this.currentMonster.heal();
                    this.currentTurn = "player";
                    this.phase = "predraw";
                    this.currentMonster.combatant = null;
                }
            } else {
                this.currentMonster.heal();
                this.currentTurn = "player";
                this.phase = "predraw";
                this.currentMonster.combatant = null;
                this.lastDrawnCard.setVisibility(false);
            }
        }
    }

    endPhase() {
        this.outcomes.push(this.calculateWinner());
        
        if (this.outcomes.length - this.calculateRoundsWon() >= 3) {
            this.scene.start('EndScene', { outcome: "lost" });
        } else if (this.calculateRoundsWon() >= 3) {
            console.log("Starting end scene");
            this.scene.start('EndScene', { outcome: "won" });
        } else {
            this.scene.start('RoundScene', { outcomes: this.outcomes });
        }
    }

    calculateWinner() {
        if (this.dealer.getCardsValue() == 21 && this.dealer.asActiveCombatant.combatant.health > 0) {
            //dealer wins
            return 0;
        } else if (this.player.getCardsValue() == 21 && this.player.asActiveCombatant.combatant.health > 0) {
            //player wins
            return 1;
        } else if (this.player.asActiveCombatant.combatant.health <= 0) {
            //dealer wins
            return 0;
        } else if (this.player.getCardsValue() < this.dealer.getCardsValue()) {
            //dealer wins
            return 0;
        } else {
            //player wins
            return 1;
        }
    }

    calculateRoundsWon() {
        var roundsWon = 0;
        for (var i = 0; i < this.outcomes.length; i++) {
            roundsWon += this.outcomes[i];
        }
        return roundsWon;
    }

        




}