frontend-nanodegree-arcade-game
===============================

Game Objective:
===============
The goal of the game is to guide your character across the enemy paths safely to the
water. However, you must dodge enemy lady bugs with out making contact. If you make
contact, the game will reset and you must start over.

Rules and Notables:
===================
1 - The player must not make contact with the enemy on any side (left, right top and
bottom). Contact on any side will result in a collision.

2 - Player controls - the player can control the game player by pressing the up, down,
left or right arrows. Pressing up or down will move the player exactly 1 row at a time.
This so that inadvertent collisions will not occur and the player can wait above or 
below an enemy as it passes by. Pressing the left or right arrows will result in the 
player moving in varying incremental distances. This will allow the player to have the
freedom to move up or down outside of the game area columns.

3 - The player will not be able to move off the game area.

4 - The enemy lady bugs will only travel from left to right on the 3 cobble stone rows.
They will be able to move at 3 different speeds at random.

5 - When a collision occurs, a message will appear at the top of the screen and the player
will be reset back to the starting position. The message will clear upon the players
first move.
