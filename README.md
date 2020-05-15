# Quantum Computing Card Game
PnP/Digital card game.

## Rules
This is a two-player abstract game. The aim of the game to perform actions to match the board state to your target states. The winner is the first player to fulfill all three of their target cards.

### Components
- 16 Dual-colored qubit tiles
- 24 One-way entanglement arrows
- 24 Two-way entanglement arrows
- 18 Target state cards

### Setup
1. Shuffle the target states cards and deal 3 to each player.
2. Layout the tiles in a 4x4 grid. You may choose to start with a completely random initial board or with all tiles set to one color. Leave enough space between adjacent tiles to fit the entanglement arrows.
3. Randomly decide on a first player.

### Play
On a player's turn, they may spend up to 3 action points performing operations on the board. The available operations and costs are:
- 1 point: Flip a qubit.
- 1 point: Entangle any two adjacent qubits (Either one or two-way).
- 2 points: Break an entanglement.

If at the end their turn, the board matches any of their target state cards (in any of the four orientations), they may flip that card over, indicating that it is complete. If they flip over their last card, they win. If the was the first player, the second player may force a draw if they can also complete their third target card on the following turn.

*Entanglement.* When an entangled qubit is flipped, all qubits it is pointing to will simultaneously flip with it. This may cause a long chain reaction of flips throughout the board. If the entanglement arrows form a closed loop anywhere, the qubits still only flip once, so that there is no infinite loop.

*Periodic boundary conditions.* Players may wish to play with periodic boundary conditions where the board wraps around when considering adjacency.

<!-- ### Variation
Instead of using two-sided tiles to indicate qubit states, use six-sided dice. In this case, remove the one-way entanglement arrows from the game. Now, when two qubits are entangled, they must always add up to their sum when entangled (i.e. 4+5 -> 3+6). The target state cards can still be used, but now are used to mean high/low or even/odd. -->