To setup the game install a local web server like XAMPP. After that run the 21_monsters.html page in the web server with all other files present. 

How the game works:
Blackjack but every time you draw a card you fight a monster
The higher the combined value of all your drawn cards is, the higher the monsters stats will be
Combat is automatic and done without player input, outcome is dependent on rolls of the dice and stats of the player and monster
You start each round with a set health pool, if the monster damages you that health will go down and stay down till the end of the round
The player will be playing against a dealer who will have his own health pool and will combat monsters each round as well
The player goes first and then the player and dealer alternate in drawing cards
Before each card draw by the player, the player can decide to stop playing

The round ends when either:
1.	The player's health reaches 0
2.	The dealer's health reaches 0 and the player overtakes him in combined card value
3.	The player stops playing and the dealer overtakes him in combined card value
4.	Either the player or dealer's combined card value equals 21
If the player dies the dealer wins the round
If the dealer dies the player has to overtake the combined card value the dealer had before drawing the card that killed him, if the player manages to do this he wins the round, if not the dealer wins
If the player stops and the dealer overtakes him in combined card value without dying, the dealer wins
Whoever manages to reach a combined card value of 21 without dying wins the round, even if the other player is still playing
If someone reaches a combined card value above 21 they die instantly

After each round your health and all cards reset and another round begins
To win the game win at least 3 out of the 5 rounds that will be played

Combat:
Each monster and player has the following stats:
•	Health: if it reaches 0 the combatant dies
•	Base attack: when attacking this is the minimum amount of damage the combatant does
•	Bonus attack: a random number between 0 and the bonus attack value will be generated each attack and added to the base attack
•	Armour: Reduces the amount of damage the opponent inflicts
Each attack will reduce your opponent's health by the value of the your base attack + your generated bonus attack - the opponent's armour.
If the base attack plus bonus attack is lower that the opponent's armour the damage will be 0.

Combat example:
The round starts and the player draws a 3 of spades,
The player has the following stats:
•	Health: 30
•	Base attack : 5
•	Bonus attack : 10
•	Armor : 5
The monster corresponding to the value 3 has the following stats:
•	Health: 10
•	Base attack: 2
•	Bonus attack: 5
•	Armor: 2
The player will attack first and roll and 4 on his bonus attack, the monster's health will be reduced by:
5 player base attack + 4 player bonus attack - 2 monster armour = 7 damage
The monster's new health will be 10 - 7 = 3 
The monster will the attack and roll a 2 on his bonus attack, the player's health will be reduced by:
2 monster base attack + 2 monster bonus attack - 5 player armour = -1 damage
Because the damage is negative the monster will do 0 damage to the player and the player will remain at 30 health
The player will then attack once more and roll a 2 on his bonus attack, the monster's health will be reduced by
5 player base attack + 2 player bonus attack - 2 monster armour = 5 damage
The monster's new health will be 3 - 5 = -2 which kills the monster 
After the dealer's turn the player decides to proceed and draws another card, it's a 7 of hearts, the player will then proceed to combat the monster corresponding to the combined value of his drawn cards so 3 + 7 = 10.
